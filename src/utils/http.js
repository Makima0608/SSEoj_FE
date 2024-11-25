import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';


const httpInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
})

httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(
    res => {
        if (res.data.err != null) {
            ElMessage({
                type: 'warning',
                message: res.data.msg   //根据api更改
            })
            return Promise.reject(res)
        }
        else {
            console.log(res.data)
            return res.data
        }
    },
    e => {
        const useStore = useUserStore()
        ElMessage({
            type: 'warning',
            message: e.response.data.msg   //根据api更改
        })
        if (e.response.state === 401) {
            useStore.clearUserInfo()
            router.push('/')
        }
        console.log(e)
        return Promise.reject(e)
    })

export default httpInstance