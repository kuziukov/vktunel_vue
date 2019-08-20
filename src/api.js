import axios from 'axios'


const api = axios.create({
    baseURL: 'https://api.wlusm.ru/v1.0',
    timeout: 10000,
    headers: {'Authorization': localStorage.getItem('token')}
});


api.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    config.headers.Authorization = token;
    config.headers.common['Authorization'] = token;
    NProgress.start();
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