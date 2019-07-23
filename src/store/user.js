import axios from "axios";

export default {
    state: {
        token: localStorage.getItem('token') || '',
        user: {},
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
        },
        LOGOUT(state){
            state.token = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization']
        },
        USER_UPDATED(state, user){
            state.user = user
        },
    },
    actions: {
        SIGNUP({commit}, code){
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:5000/v1.0/authorization/code', data: code, method: 'POST' })
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            var access_token = resp.data['result']['access_token'];
                            commit('SET_TOKEN', access_token);
                            resolve(resp)
                        }
                        else{
                            commit('LOGOUT');
                            reject();
                        }
                    })
                    .catch(err => {
                        commit('LOGOUT');
                        reject(err)
                    })
            })
        },
        LOGOUT({commit}){
            return new Promise((resolve) => {
                commit('LOGOUT')
                resolve()
            })
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
    }
}