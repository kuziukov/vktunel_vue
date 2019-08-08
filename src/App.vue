<template>
  <div id="app">
    <MenuComponent></MenuComponent>
    <notifications group = "foo" position="top right" width="30%" classes="my-style" >
      <template slot="body" slot-scope="props">

        <div :class="'alert alert-' + props.item.type" role="alert">
          <strong>{{props.item.title}}</strong>
          <p>{{props.item.text}}</p>
        </div>


      </template>
    </notifications>
    <router-view></router-view>
  </div>
</template>

<style>
  html{
    overflow-y: scroll;
  }
  .notifications{
    margin-top: 80px;
  }
</style>

<script>
import MenuComponent from './components/MenuComponent.vue'

export default {
  name: 'app',
  components: {
    MenuComponent
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }

        throw err;
      });
    });
  }
}
</script>
