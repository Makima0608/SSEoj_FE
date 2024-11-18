import request from '@/utils/http'

export const loginAPI = ({ email, password }) => {
    return request({
        url: '/api/identity/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
}