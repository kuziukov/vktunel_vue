import api from "../api";

export default {
    state: {
        notification: localStorage.getItem('notification') || '',
    },
    mutations: {
        notification_token(state, token){
            state.notification = token;
            localStorage.setItem('notification', token);
        },
    },
    actions: {
        subscribe({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/subscription', payload)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            commit('notification_token', payload.token);
                            resolve(resp)
                        }
                        else{
                            reject();
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
    },
    getters: {
        isSubscribed: state => !!state.notification,
        token: state => state.notification,
    }
}