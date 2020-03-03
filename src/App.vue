<template>
  <div id="app">
    <MenuComponent></MenuComponent>
    <notifications group = "foo" position="top right" width="30%" >
      <template slot="body" slot-scope="props">
        <div :class="'alert alert-' + props.item.type" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="title">{{props.item.title}}</div>
          <div class="body" v-html="props.item.text"></div>
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
    }
  }

  @media (min-width: 576px) {
    .notifications{
      position: absolute;
      margin-top: 155px;
      margin-right: 10px;
    }
  }

  @media (min-width: 768px) {
    .notifications{
      position: absolute;
      margin-top: 90px;
      margin-right: 10px;
    }
    .notifications .title {
      font-size: 16px;
    }
    .notifications .body {
      font-size: 15px;
      font-weight: lighter;
    }
    .notifications .close{
      font-size: 1.2rem;
      color: #a6a6a6;
    }
  }


</style>

<script>

import MenuComponent from './components/MenuComponent.vue'
import store from "./store";
import { WEBSOCKETURL } from './config'

export default {
  name: 'app',
  components: {
    MenuComponent
  },
  computed: {
      isAuthenticated : function(){ return this.$store.getters.isAuthenticated},
      isConnected: function () { return this.$store.getters.isConnected }
  },
  methods: {
      stream_connect(){
          if (this.isAuthenticated){
              store.dispatch('stream').then(respose => {
                  this.$connect(`${WEBSOCKETURL}${respose.key}`);
              }).catch(err => {
                  console.log(err);
              });
          }
      },
      stream_disconnect(){
          if  (this.isConnected){
              this.$disconnect();
          }
      }
  },
  watch: {
      isAuthenticated: function (next, prev) {
          if(next){
              this.stream_connect();
          }
          if(prev){
              this.stream_disconnect();
          }
      }
  },
  created: function () {
      this.stream_connect();

      this.$http.interceptors.response.use(undefined, function (err) {
          return new Promise(function (resolve, reject) {
              if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                  console.log('LOGOUT')
                  this.$store.dispatch('LOGOUT')
              }
              throw err;
          });
      });
  }
}
</script>
