<template>
    <div>
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
          <router-link :to="{ name: 'Index' }">
              <img src="/cloud_logo.svg" width="50" height="50">
          </router-link>
          <h5 class="my-0 mr-md-auto font-weight-normal">
              <router-link style="text-decoration: none !important; color: #343a40!important" :to="{ name: 'Index' }">
                  Wlusm
              </router-link>
          </h5>
          <nav class="my-2 my-md-0 mr-md-3">
              <router-link v-bind:key="item.id" v-for="item in menuItems" :to="{ name: item.route }" class="p-2 text-dark">
                  {{item.title}}
              </router-link>
              <router-link class="p-2 text-dark" v-on:click.native="logout" v-if="isAuthenticated" to="/">Выход</router-link>
          </nav>

          <ul class="navbar-default nav navbar-nav navbar-right mr-md-4" v-if="isAuthenticated">
              <li class="dropleft">
                  <a href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" @click="getNotifications(0, 5)">
                      <i class="fa fa-bell-o fa-lg" aria-hidden="true"></i>
                  </a>
                  <ul class="dropdown-menu notify-drop" v-on:click.stop="">
                      <div class="notify-drop-title">
                          <div class="row">
                              <div class="col-md-6 col-sm-6 col-xs-6">Ваша активность </div>
                              <div class="col-md-6 col-sm-6 col-xs-6 text-right">
                                  <a href="#" class="rIcon allRead" data-tooltip="tooltip" data-placement="bottom" title="все прочитанные">
                                      <i class="fa fa-dot-circle-o"></i>
                                  </a>
                              </div>
                          </div>
                      </div>

                      <div class="drop-content">
                          <li v-bind:key="notification.id" v-for="notification in getActivities">
                              <div class="media">
                                  <img class="col-md-3 col-sm-3 col-xs-3" :src="`/icons/${notification.type}.png`" alt="Generic placeholder image">
                                  <div class="media-body">
                                      <p class="mt-0" v-html="notification_title(notification)"></p>
                                  </div>
                                  <a href="#" class="rIcon mr-md-3 mt-md-2">
                                      <i class="fa fa-dot-circle-o"></i>
                                  </a>
                              </div>
                          </li>
                      </div>
                      <div class="notify-drop-footer text-center">
                          <a href=""></a>
                          <router-link class="p-2 text-dark" to="/notifications">Показать все</router-link>
                      </div>
                  </ul>
              </li>
          </ul>
          <button class="btn btn-outline-primary" @click="login" v-if="!isAuthenticated">Присоединиться</button>
        </div>
    </div>

</template>




<script>
    import { mapGetters, mapMutations } from 'vuex';
    import { askForPermissioToReceiveNotifications } from '../push-notification';
    import { oauthAuthorizationLink } from '../utils'
    import { make_notification_titles } from '../utils';

    export default {
        name: 'MenuComponent',
        data(){
            return{}
        },
        computed : {
            ...mapGetters(['getActivities', 'isAuthenticated', 'profile']),
            systemToken : function(){ return this.$store.getters.token},
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
                            title: 'Список задач',
                            route: 'Tasks'
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
                            title: 'Тарифные планы',
                            route: 'Plans',
                        },
                        {
                            title: 'Поддержка',
                            route: 'Support',
                        }
                    ]
            }
        },
        watch: {
            isAuthenticated: function (next, prev) {
                if(next){
                    this.$store.dispatch('getProfile')
                        .then().catch().finally(() => {
                    });
                }
            }
        },
        methods: {
            ...mapMutations(['setActivities']),
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
            getNotifications: async function (start, limit) {
                try {
                    let response = await this.$store.dispatch('notifications', { 'start': start, 'limit': limit });
                    this.setActivities(response);
                } catch (e) {
                    this.$notify({
                        group: 'foo',
                        title: 'Ваша Активность',
                        type: 'danger',
                        text: 'Произошла неизвестная ошибка, попробуйсте позднее'
                    });
                }
            },
            notification_title: function (notification) {
                return make_notification_titles(notification)
            },
            login: function () {
                window.location = oauthAuthorizationLink()
            },
            logout: function () {
                this.$store.commit('LOGOUT');
                this.$router.push('/');
            },
        },
        async beforeCreate() {
            if(this.$store.getters.isAuthenticated){
                await this.$store.dispatch('getProfile');
            }
        },
        async created(){
            if(this.isAuthenticated){
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
            }
        }
    }
</script>


<style>
    .navbar-default .dropdown-menu.notify-drop {
        min-width: 330px;
        background-color: #fff;
        min-height: 360px;
        max-height: 360px;
    }
    .navbar-default .dropdown-menu.notify-drop .notify-drop-title {
        border-bottom: 1px solid #e2e2e2;
        padding: 5px 15px 10px 15px;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content {
        min-height: 280px;
        max-height: 280px;
        overflow-y: scroll;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }

    .navbar-default .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar
    {
        width: 8px;
        background-color: #F5F5F5;
    }

    .navbar-default .dropdown-menu.notify-drop .drop-content::-webkit-scrollbar-thumb
    {
        background-color: #ccc;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li {
        border-bottom: 1px solid #e2e2e2;
        padding: 10px 0px 5px 0px;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li:nth-child(2n+0) {
        background-color: #fafafa;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li:after {
        content: "";
        clear: both;
        display: block;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li:hover {
        background-color: #fcfcfc;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li:last-child {
        border-bottom: none;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li .notify-img {
        float: left;
        display: inline-block;
        width: 45px;
        height: 45px;
        margin: 0px 0px 8px 0px;
    }
    .navbar-default .dropdown-menu.notify-drop .allRead {
        margin-right: 7px;
    }
    .navbar-default .dropdown-menu.notify-drop .rIcon {
        float: right;
        color: #999;
    }
    .navbar-default .dropdown-menu.notify-drop .rIcon:hover {
        color: #333;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li a {
        font-size: 12px;
        font-weight: normal;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li {
        font-weight: bold;
        font-size: 11px;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li hr {
        margin: 5px 0;
        width: 70%;
        border-color: #e2e2e2;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content .pd-l0 {
        padding-left: 0;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li p {
        font-size: 11px;
        color: #666;
        font-weight: normal;
        margin: 3px 0;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li p.time {
        font-size: 10px;
        font-weight: 600;
        top: -6px;
        margin: 8px 0px 0px 0px;
        padding: 0px 3px;
        border: 1px solid #e2e2e2;
        position: relative;
        background-image: linear-gradient(#fff,#f2f2f2);
        display: inline-block;
        border-radius: 2px;
        color: #B97745;
    }
    .navbar-default .dropdown-menu.notify-drop .drop-content > li p.time:hover {
        background-image: linear-gradient(#fff,#fff);
    }
    .navbar-default .dropdown-menu.notify-drop .notify-drop-footer {
        border-top: 1px solid #e2e2e2;
        bottom: 0;
        position: relative;
        padding: 2px 15px;
    }
    .navbar-default .dropdown-menu.notify-drop .notify-drop-footer a {
        color: #777;
        text-decoration: none;
    }
    .navbar-default .dropdown-menu.notify-drop .notify-drop-footer a:hover {
        color: #333;
    }

    @media (min-width: 992px) {
        .animate {
            animation-duration: 0.3s;
            -webkit-animation-duration: 0.3s;
            animation-fill-mode: both;
            -webkit-animation-fill-mode: both;
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateY(1rem);
            opacity: 0;
        }
        100% {
            transform:translateY(0rem);
            opacity: 1;
        }
        0% {
            transform: translateY(1rem);
            opacity: 0;
        }
    }

    @-webkit-keyframes slideIn {
        0% {
            -webkit-transform: transform;
            -webkit-opacity: 0;
        }
        100% {
            -webkit-transform: translateY(0);
            -webkit-opacity: 1;
        }
        0% {
            -webkit-transform: translateY(1rem);
            -webkit-opacity: 0;
        }
    }

    .slideIn {
        -webkit-animation-name: slideIn;
        animation-name: slideIn;
    }

</style>
