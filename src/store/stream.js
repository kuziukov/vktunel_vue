import api from "../api";
import { make_notification_titles } from '../utils'

export default {
    state:{
        socket: {
            isConnected: false,
            reconnectError: false,
        }
    },
    mutations:{
        SOCKET_ONOPEN (state, event)  {
            this.$socket = event.currentTarget;
            state.socket.isConnected = true
            console.log('Notification server connected')
        },
        SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false
            console.log('Notification server disconnected')
        },
        SOCKET_ONERROR (state, event)  {
            console.error(state, event)
        },
        SOCKET_ONMESSAGE (state, message)  {

            switch (message['type']) {
                case 'TaskAdded':

                    break;
                case 'TaskComplited':
                    this._vm.$notify({
                        group: 'foo',
                        title: 'Загрузка альбома',
                        type: 'success',
                        text: make_notification_titles(message)
                    });
                    break;
                case 'PlanChanged':

                    break;
                case 'PlanDeleted':

                    break;
            }

        },
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        stream({commit}, payload){
            return new Promise((resolve, reject) => {
                api.get('/stream', {params: payload})
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
        },
    },
    getters:{
        isConnected: state => !!state.socket.isConnected,
    }
}