import request from '@/utils/http'

export const getProblemListAPI = (params) => {
    return request ({
        url: '/api/problemlist/',
        params,
    })
}