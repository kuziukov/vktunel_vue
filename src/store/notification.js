import api from "../api";

export default {
    state: {
        notification: localStorage.getItem('notification') || '',
        notifications: JSON.parse(localStorage.getItem('notifications') || null),
    },
    mutations: {
        add_notification(state, notification){
            state.notifications.push(notification);
        },
        remove_notification(state, notification_id){
            state.notifications = state.notifications.filter(function(value){
                return value['id'] !== notification_id;
            });
        },
        save_notifications(state, notifications){
            state.notifications = notifications;
            localStorage.setItem('notifications', JSON.stringify(notifications));
        },
        sort_notifications(state){
            let sortKey = 'created_at';
            state.notifications = state.notifications.sort((a, b) => {
                let compare = 0;
                if (a[sortKey] < b[sortKey]) {
                    compare = 1;
                } else if (b[sortKey] < a[sortKey]) {
                    compare = -1;
                }
                return compare;
            });
        },
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
        notifications({commit}, payload){
            return new Promise((resolve, reject) => {
                api.get('/notifications', {params: payload, showProgressBar: false})
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let data = resp.data['result']['items'];
                            commit('save_notifications', data);
                            commit('sort_notifications');
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