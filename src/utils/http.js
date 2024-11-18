import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from 'element-plus';


const httpInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
})

httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(
    res => {
        if (res.data.code != 200) {
            ElMessage({
                type: 'warning',
                message: res.data.message   //根据api更改
            })
            return Promise.reject(res)
        }
        else
            return res.data
            
    }, 
    e => {
    ElMessage({
        type: 'warning',
        message: e.response.data.message   //根据api更改
    })
    console.log(e)
    return Promise.reject(e)
})

export default httpInstance