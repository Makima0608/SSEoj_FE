import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})

    const getUserInfo = async(email, password) => {
        const res =  await loginAPI({email, password})
        userInfo.value = res.data
        console.log("get user info", userInfo.value)
    }

    const clearUserInfo = () => {
        userInfo.value = {}
    }

    const isAuthenticated = () => {
        return !!userInfo.value && !!userInfo.value.id
    }

    const getAvatar = () => {
        return `data:image/png;base64, ${userInfo.value.avatar}`
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
        isAuthenticated,
        getAvatar,
    }

}, {
    persist: true,
})
