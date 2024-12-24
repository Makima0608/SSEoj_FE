import request from '@/utils/http'

// 获取问题详细描述 API
export const getProblemDescAPI = (id) => {
    return request({
        url: `/api/problem/${id}/description/`,
    })
}   

// 获取题解列表 API
export const getSolutionListAPI = (id, params) => {
    return request({
        url: `/api/problem/${id}/solutions`,
        params
    })
}

export const likeSolutionAPI = (id, is_good) => {
    return request({
        url: '/api/solution/good/',
        method: 'POST',
        data: {
            id: id,
            is_good: is_good
        }
    })
}