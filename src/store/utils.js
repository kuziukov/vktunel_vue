import api from '../api'

export default {
    state: {},
    mutations: {},
    actions: {
        SEARCH({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/utils/link', payload)
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
        SUBSCRIBE({commit}, payload){
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
    getters: {}
}