import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store.js'


Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.headers.common['Content-Type'] = 'application/json'

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
