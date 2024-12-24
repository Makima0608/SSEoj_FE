import request from '@/utils/http'

// 登陆的api
export const loginAPI = ({ email, password }) => {
    return request({
        url: '/api/identity/login/',
        method: 'POST',
        data: {
            email,
            password
        }
    })
}

export const logoutAPI = () => {
    return request({
        url: "/api/identity/logout/",
        method: 'GET',
    })
}
