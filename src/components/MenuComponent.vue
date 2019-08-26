<template>
    <div>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <img src="/cloud_logo.svg" width="50" height="50">
          <h5 class="my-0 mr-md-auto font-weight-normal">Wlusm</h5>
          <nav class="my-2 my-md-0 mr-md-3">
              <router-link v-bind:key="item.id" v-for="item in menuItems" :to="{ name: item.route }" class="p-2 text-dark">{{item.title}}</router-link>
          </nav>
          <router-link class="btn btn-outline-primary" :to="{ name: 'Tasks' }" v-if="isAuthenticated">
              {{profile.name}}
          </router-link>
          <a class="btn btn-outline-primary" @click="login" v-if="!isAuthenticated">Присоединиться</a>
      </div>
    </div>

</template>


<script>

    import { askForPermissioToReceiveNotifications } from '../push-notification';

    export default {
        name: 'MenuComponent',
        computed : {
            systemToken : function(){ return this.$store.getters.token},
            isAuthenticated : function(){ return this.$store.getters.isAuthenticated},
            profile: function(){ return this.$store.getters.profile},
            menuItems : function() {
                return this.isAuthenticated ?
                    [
                        {
                            title: 'На главную',
                            route: 'Index',
                        },
                        {
                            title: 'Сообщества',
                            route: 'Community',
                        },
                        {
                            title: 'Поддержка',
                            route: 'Support',
                        }
                    ]
                    :[
                        {
                            title: 'На главную',
                            route: 'Index',
                        },
                        {
                            title: 'Поддержка',
                            route: 'Support',
                        }
                    ]
            },
        },
        watch: {
            isAuthenticated: function (next, prev) {
                if(next){
                    this.$store.dispatch('GET_PROFILE')
                        .then().catch().finally(() => {
                    });
                }
            }
        },
        async created(){
            let requestPermission = await Notification.requestPermission();

            if(requestPermission === 'denied'){
                console.log('Permission wasn\'t granted. Allow a retry.');
                return;
            }

            if(requestPermission === 'default'){
                console.log('The permission request was dismissed.');
                return;
            }
            this.subscribe();
        },
        methods: {
            subscribe: async function () {
                let token = await askForPermissioToReceiveNotifications();
                if (token){
                    let payload = {
                        "token": token
                    };
                    if(!(this.systemToken === token)){
                        this.$store.dispatch('subscribe', payload).then(resp => {
                            if ('code' in resp.data && resp.data['code'] === 200){
                                //console.log(resp)
                            }
                        }).catch(err => {
                            console.log(err)
                        })

                    }

                }

            },
            login: function () {
                window.location = 'https://oauth.vk.com/authorize?client_id=7029024&display=page&redirect_uri=https://wlusm.ru/callback&scope=friends,photos,email,groups,offline&response_type=code&v=5.95';
            }
        },
        beforeCreate() {
            if(this.$store.getters.isAuthenticated){
                this.$store.dispatch('GET_PROFILE')
                    .then().catch().finally(() => {
                });
            }
        },
    }
</script>

