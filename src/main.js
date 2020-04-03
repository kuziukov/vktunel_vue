import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Notifications from 'vue-notification'
import VueNativeSock from 'vue-native-websocket'
import { initializeFirebase } from './push-notification';
import { WEBSOCKET } from './config'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store.js'


Vue.use(VueAnalytics, {
    id: 'UA-162685392-1',
    router
});
Vue.use(Notifications);
initializeFirebase();

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.use(VueNativeSock, WEBSOCKET, {
    connectManually: true,
    store: store,
    format: 'json',
});


const token = localStorage.getItem('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
