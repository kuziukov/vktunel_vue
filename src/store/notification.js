import api from "../api";
import { initialization } from '../utils'

export default {
    state: {
        notification: localStorage.getItem('notification') || '',
        notifications: JSON.parse(localStorage.getItem('notifications') || null),
        activities: JSON.parse(localStorage.getItem('activities') || null),
    },
    mutations: {
        setActivities(state, payload){
            state.activities = payload;
            localStorage.setItem('activities', JSON.stringify(state.activities));
        },
        setNotifications(state, payload){
            state.notifications = payload;
            localStorage.setItem('notifications', JSON.stringify(state.notifications));
        },
        removeActivities(state, id){
            state.activities = state.activities.filter(function(value){
                return value['id'] !== id;
            });
        },
        removeNotification(state, id){
            state.notifications = state.notifications.filter(function(value){
                return value['id'] !== id;
            });
        },
        add_notification(state, notification){
            if (!state.notifications.some(notify => notify.id === notification.id)){
                state.notifications.push(notification)
            }
        },
        add_notifications(state, notifications){
            state.notifications = state.notifications.map(obj => notifications.find(o => o.id === obj.id) || obj);
        },
        sort_notifications(state){
            state.notifications = state.notifications.sort((a,b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0));
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
                            resolve(data)
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
        deleteNotification({commit}, notification_id){
            return new Promise((resolve, reject) => {
                api.delete(`/notification/${notification_id}`)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let data = resp.data['result'];
                            resolve(data)
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
        getNotifications: state => state.notifications,
        getActivities: state => state.activities,
    }
}