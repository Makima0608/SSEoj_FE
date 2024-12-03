import request from '@/utils/http'

export const getProblemDescAPI = (id) => {
    return request({
        url: `/api/problem/${id}/description/`,
    })
}   