import api from "../api";

export default {
    state: {
        notify_token: localStorage.getItem('notify_token') || '',
    },
    mutations: {
        SET_TOKEN(state, token){
            state.notify_token = token;
            localStorage.setItem('notify_token', token);
        },
    },
    actions: {
        subscribe({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/subscription/fcm', payload)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
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
        isSubscribed: state => !!state.notify_token,
        token: state => state.notify_token,
    }
}