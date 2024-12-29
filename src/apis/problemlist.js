import request from '@/utils/http'

export const getProblemListAPI = (params) => {
    return request ({
        url: '/api/problemlist/',
        params,
    })
}

export const getProblemListDetailAPI = (id) => {
    return request({
        url: `/api/problemlist/${id}/`
    })
}