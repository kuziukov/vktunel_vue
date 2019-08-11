import api from '../api'

export default {
    state: {},
    mutations: {},
    actions: {
        CREATETASK({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/tasks', payload)
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
        TASKS({commit}){
            return new Promise((resolve, reject) => {
                api.get('/tasks')
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] == 200){
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