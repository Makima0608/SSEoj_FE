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