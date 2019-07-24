import axios from "axios";

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        COMMUNITY_TITLE({commit}, community_id){
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:5000/v1.0/community/'+community_id, method: 'GET' })
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
    },
    getters: {
    }
}