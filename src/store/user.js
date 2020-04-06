import Vue from 'vue'
import api from '../api'

export default {
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || {},
    },
    mutations: {
        setToken(state, token){
            state.token = token;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = token;
        },
        logout(state){
            state.token = '';
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        },
        setUser(state, user){
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
    },
    actions: {
        signUp({commit}, payload){
            return new Promise(async (resolve, reject) => {
                try{
                    let response = await api.post('/authorization/code', payload);
                    let access_token = response.data['result']['access_token'];
                    commit('setToken', access_token);
                    resolve(response)

                } catch (e) {
                    commit('logout');
                    reject(e)
                }

            })
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('logout');
                resolve()
            })
        },
        getProfile({commit}){
            return new Promise(async (resolve, reject) => {
                try {
                    let response = await api.get('/profile');

                    let user = response.data.result;
                    commit('setUser', user);

                    resolve(response);
                } catch (e) {
                    commit('logout');
                    reject(e);
                }
            })
        },
        getPlans({commit}){
            return new Promise((resolve, reject) => {
                api.get('/plans')
                    .then(resp => {
                        resolve(resp);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        choosePlan({commit}, plan_id){
            return new Promise((resolve, reject) => {
                api.post(`/plan/${plan_id}`).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        payPlan({commit}, plan_id){
            return new Promise((resolve, reject) => {
                api.put(`/plan/${plan_id}`).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteSubscription({commit}){
            return new Promise((resolve, reject) => {
                api.delete(`/subscription`).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        profile: state => state.user,
        plan: state => state.user.subscription,
        limits: state => {
            return state.user.subscription ? state.user.subscription.plan.limits : null
        },
        subscription: state => {
            return state.user.subscription ? state.user.subscription.plan : null
        },
        isPaid: state => {
            return state.user.subscription ? state.user.subscription.paid : null
        },
    }
}