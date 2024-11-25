import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})

    const getUserInfo = async({email, password}) => {
        const res =  await loginAPI({email, password})
        userInfo.value = res.data
        console.log(userInfo)
    }

    const clearUserInfo = () => {
        userInfo.value = {}
    }

    const isAuthenticated = () => {
        return !!userInfo.value && !!userInfo.value.id
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
        isAuthenticated,
    }

}, {
    persist: true,
})
