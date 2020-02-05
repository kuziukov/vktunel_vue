import api from "../api";

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
        },
        SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false
        },
        SOCKET_ONERROR (state, event)  {
            console.error(state, event)
        },
        SOCKET_ONMESSAGE (state, message)  {

            if ('message' in message){
                this._vm.$notify({
                    group: 'foo',
                    title: 'Произошла ошибка',
                    type: 'warning',
                    text: message['message']
                });
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