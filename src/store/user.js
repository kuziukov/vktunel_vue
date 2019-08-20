import api from '../api'

export default {
    state: {
        token: localStorage.getItem('token') || '',
        user: {},
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = token;
        },
        LOGOUT(state){
            state.token = '';
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization']
        },
        USER_UPDATED(state, user){
            state.user = user
        },
    },
    actions: {
        SIGNUP({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/authorization/code', payload).then(resp => {
                    if ('code' in resp.data && resp.data['code'] === 200){
                        var access_token = resp.data['result']['access_token'];
                        commit('SET_TOKEN', access_token);
                        resolve(resp)
                    }
                    else{
                        commit('LOGOUT');
                        reject();
                    }
                }).catch(err => {
                    commit('LOGOUT');
                    reject(err)
                })
            })
        },
        LOGOUT({commit}){
            return new Promise((resolve) => {
                commit('LOGOUT');
                resolve()
            })
        },
        GET_PROFILE({commit}){
            return new Promise((resolve, reject) => {
                api.get('/profile')
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            commit('USER_UPDATED', resp.data.result);
                            resolve(resp);
                        }
                    })
                    .catch(() => {
                        commit('LOGOUT');
                        reject();
                    })
            })
        },
    },
    getters: {
        isAuthenticated: state => !!state.token,
        profile: state => state.user,
    }
}