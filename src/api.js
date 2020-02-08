import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:5000/v1.0',
    timeout: 30000,
    headers: {'Authorization': localStorage.getItem('token')},
    showProgressBar: false,
});


api.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    config.headers.Authorization = token;
    config.headers.common['Authorization'] = token;
    if ((config.showProgressBar === undefined) || (config.showProgressBar === true)){
        NProgress.start();
    }
    return config
});

api.interceptors.response.use(response => {
        NProgress.done();
        return response
    },
    error => {
        NProgress.done();
        return error
});

export default api