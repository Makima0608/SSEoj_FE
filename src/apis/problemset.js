import request from '@/utils/http'

export const getProblemSetAPI = (params) => {
    return request({
        url: '/api/problemset/',
        params ,
    })
}   