<template>
  <div id="app">
    <notifications group = "foo" position="top center" width="30%" >
      <template slot="body" slot-scope="props">

        <div :class="'alert alert-' + props.item.type" role="alert">
          <strong>{{props.item.title}}</strong>
          <p>{{props.item.text}}</p>
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

    .my-style {
      margin-top: 20px;

    }
</style>
