import api from '../api'

export default {
    state: {
        communities: []
    },
    mutations: {
        SAVE_COMMUNITIES(state, communities){
            state.communities = communities;
        },
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
        communities({commit}){
            return new Promise((resolve, reject) => {
                api.get('/communities')
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let data = resp.data['result']['items'];
                            commit('SAVE_COMMUNITIES', data);
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
        listOfCommunities: state => state.communities,
    }
}