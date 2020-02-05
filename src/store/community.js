import api from '../api'

export default {
    state: {
        communities: JSON.parse(localStorage.getItem('communities') || null)
    },
    mutations: {
        SAVE_COMMUNITIES(state, communities){
            state.communities = communities;
            localStorage.setItem('communities', JSON.stringify(communities));
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
        COMMUNITIES({commit}){
            return new Promise((resolve, reject) => {
                api.get('/communities')
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let data = resp.data['result'];
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