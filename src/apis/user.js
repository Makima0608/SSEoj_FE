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

// 获取用户信息
export const getUserInfoAPI = (id) => {
    return request({
        url: `/api/user/${id}/info/`
    })
}

// 退出登录
export const logoutAPI = () => {
    return request({
        url: "/api/identity/logout/",
        method: 'GET',
    })
}

// 获取用户创建的题单
export const getCreateProblemListAPI = (id) => {
    return request({
        url: `/api/user/${id}/create_problemlist/`
    })
}

export const proflieChangeAPI = () => {
    return request({
        url: "/api/user/profile_change/",
        method: 'PUT',
    })
}

export const usernameChangeAPI = () => {
    return request({
        url: "/api/user/user_name_change/",
        method: 'PUT',
    })
}

export const avatarChangeAPI = () => {
    return request({
        url: "/api/user/avatar_change/",
        method: 'PUT',
    })
}

export const passwordChangeAPI = ({ oldPassword, newPassword }) => {
    return request({
        url: "/api/user/password_change",
        method: 'PUT',
    })
}

export const passwordForgetAPI = () => {
    return request({
        url: "/api/user/password_forget",
        method: 'PUT',
    })
}
