import api from '../api'

export default {
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || null) ,
    },
    mutations: {
        setTasks(state, tasks){
            state.tasks = tasks;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        },
    },
    actions: {
        createTask({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/tasks', payload)
                    .then(resp => {
                        resolve(resp.response)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        tasks({commit}){
            return new Promise((resolve, reject) => {
                api.get('/tasks')
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            let tasks = resp.data['result']['items'];
                            commit('setTasks', resp.data['result']['items']);
                            resolve(tasks)
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
        getTasks: state => state.tasks,
    }
}