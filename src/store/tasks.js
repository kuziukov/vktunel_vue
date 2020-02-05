import api from '../api'

export default {
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || null) ,
    },
    mutations: {
        SAVE_TASKS(state, tasks){
            state.tasks = tasks;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        },
    },
    actions: {
        CREATETASK({commit}, payload){
            return new Promise((resolve, reject) => {
                api.post('/tasks', payload)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
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
                            let tasks = resp.data['result'];
                            commit('SAVE_TASKS', tasks);
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
        listOfTasks: state => state.tasks,
    }
}