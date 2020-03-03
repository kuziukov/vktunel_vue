import axios from 'axios'
import { APIURL } from './config'

const api = axios.create({
    baseURL: APIURL,
    timeout: 5000,
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