import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state){
      state.status = 'error'
    },
    user_updated(state, user){
      state.user = user
    },
    logout(state){
      state.status = '';
      state.token = '';
      state.user = {};
    },
  },
  actions: {
    authorization_code({commit}, code){
      return new Promise((resolve, reject) => {
        commit('auth_request');

        axios({url: 'http://localhost:5000/v1.0/authorization/code', data: code, method: 'POST' })
        .then(resp => {
            if ('code' in resp.data && resp.data['code'] === 200){
                var access_token = resp.data['result']['access_token'];

                localStorage.setItem('token', access_token);
                axios.defaults.headers.common['Authorization'] = access_token;
                commit('auth_success', access_token, null);
                resolve(resp)
            }
            else{
              commit('auth_error');
              localStorage.removeItem('token');
              reject();
            }
        })
        .catch(err => {
          commit('auth_error');
          localStorage.removeItem('token');
          reject(err)
        })
      })
    },
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request');
          axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user);
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    register({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      logout({commit}){
        return new Promise((resolve) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getProfile: state => state.user,
  }
})