import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store.js'


Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})