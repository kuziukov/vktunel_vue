// in HTTP.js
import axios from 'axios'

// create a new axios instance
const instance = axios.create({
    baseURL: 'http://localhost:5000/v1.0',
    timeout: 1000,
    headers: {'Authorization': localStorage.getItem('token')}
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
    NProgress.start()
    return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
    NProgress.done()
        return response
    },
    error => {
        NProgress.done()
        return error
    })

export default instance