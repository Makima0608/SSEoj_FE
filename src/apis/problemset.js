import request from '@/utils/http'

export const getProblemAPI = () => {
    return request({
        url: '/api/problemset/',
        params: {
            page: null,
            page_size: 20,
        }
    })
}   