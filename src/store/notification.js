import api from "../api";

export default {
    state: {
        notification: localStorage.getItem('notification') || '',
        notifications: JSON.parse(localStorage.getItem('notifications') || null),
    },
    mutations: {
        notification_token(state, token){
            state.notification = token;
            localStorage.setItem('notification', token);
        },
        SAVE_NOTIFICATIONS(state, notifications){
            state.notifications = notifications;
            localStorage.setItem('notifications', JSON.stringify(notifications));
        },
        remove_notification(state, notification_id){
            state.notifications['items'] = state.notifications['items'].filter(function(value){
                return value['id'] !== notification_id;
            });
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
        notifications({commit}, payload){
            return new Promise((resolve, reject) => {
                api.get('/notifications', {params: payload})
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let data = resp.data['result'];
                            commit('SAVE_NOTIFICATIONS', data);
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
        notification_delete({commit}, notification_id){
            return new Promise((resolve, reject) => {
                api.delete(`/notification/${notification_id}`)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            commit('remove_notification', notification_id);
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
        }
    },
    getters: {
        isSubscribed: state => !!state.notification,
        token: state => state.notification,
        listOfNotifications: state => state.notifications,
    }
}