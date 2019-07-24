<template>
  <div id="app">
    <notifications group = "foo" position="top right" width="25%" >
      <template slot="body" slot-scope="props">

        <div class="alert alert-info" role="alert">
          <strong>Уупс</strong> {{props.item.text}}
        </div>


      </template>
    </notifications>
    <MenuComponent></MenuComponent>
    <router-view></router-view>
  </div>
</template>

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

<style>
    html{
      overflow-y: scroll;
    }

    .vue-notification {
      margin: 60px 5px 5px;
    }
</style>
