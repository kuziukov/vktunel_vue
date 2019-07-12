<template>

    <div>
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow" v-if="isLoggedIn">
        <h5 class="my-0 mr-md-auto font-weight-normal">Вскачай все</h5>
        <nav class="my-2 my-md-0 mr-md-3">
          <router-link :to="{ name: 'Index' }" class="p-2 text-dark">На главную</router-link>
          <router-link :to="{ name: 'Community' }" class="p-2 text-dark">Сообщества</router-link>
          <router-link :to="{ name: 'Support' }" class="p-2 text-dark">Поддержка</router-link>
        </nav>
        <router-link :to="{ name: 'Tasks' }" class="btn btn-outline-primary">
            {{ profile.name }}
            <span class="badge badge-pill badge-primary">0</span>
            <span class="sr-only">unread messages</span>
        </router-link>
      </div>

      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow" v-if="!isLoggedIn">
          <h5 class="my-0 mr-md-auto font-weight-normal">VK Tunel</h5>
          <nav class="my-2 my-md-0 mr-md-3">
              <router-link :to="{ name: 'Index' }" class="p-2 text-dark">На главную</router-link>
              <router-link :to="{ name: 'Support' }" class="p-2 text-dark">Поддержка</router-link>
          </nav>
          <a class="btn btn-outline-primary" @click="login">Присоединиться</a>
      </div>
    </div>

</template>


<script>
export default {
    name: 'MenuComponent',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        profile: function(){ return this.$store.getters.getProfile}
    },
    methods: {
        login: function () {
            window.location = 'https://oauth.vk.com/authorize?client_id=7029024&display=page&redirect_uri=http://localhost:8080/callback&scope=friends,photos,email,groups,offline&response_type=code&v=5.95';
        }
    },
}
</script>

