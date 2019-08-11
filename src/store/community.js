import api from '../api'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        COMMUNITY_TITLE({commit}, community_id){
            return new Promise((resolve, reject) => {
                api.get('/community/'+community_id)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            console.log(resp.data)
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
        COMMUNITIES({commit}){
            return new Promise((resolve, reject) => {
                api.get('/communities')
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
    }
}