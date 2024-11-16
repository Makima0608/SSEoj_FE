import axios from 'axios'


const httpInstance = axios.create({
    baseURL: 'https://sseoj.com',
    timeout: 5000,
})

httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

export default httpInstance