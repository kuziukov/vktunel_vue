import instance from '../http'

export default {
    state: {},
    mutations: {},
    actions: {
        SEARCH({commit}, payload){
            return new Promise((resolve, reject) => {
                instance.post('/utils/link', payload)
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