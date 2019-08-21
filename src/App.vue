<template>
  <div id="app">
    <MenuComponent></MenuComponent>
    <notifications group = "foo" position="top right" width="30%" >
      <template slot="body" slot-scope="props">

        <div :class="'alert alert-' + props.item.type" role="alert">
          <strong>{{props.item.title}}</strong> <br>
          <div v-html="props.item.text"></div>
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

  @media (max-width: 576px) {
    .notifications{
      position: absolute;
      margin-top: 155px;
      margin-right: 10px;
      font-size: 14px;
    }
  }

  @media (min-width: 576px) {
    .notifications{
      position: absolute;
      margin-top: 155px;
      margin-right: 10px;
      font-size: 15px;
    }
  }

  @media (min-width: 768px) {
    .notifications{
      position: absolute;
      margin-top: 90px;
      margin-right: 10px;
    }
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
          this.$store.dispatch('LOGOUT')
        }
        throw err;
      });
    });
  }
}
</script>
