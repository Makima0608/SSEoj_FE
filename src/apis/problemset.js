import request from '@/utils/http'

// 获取题库
export const getProblemSetAPI = (params) => {
    return request({
        url: '/api/problemset/',
        params,
    })
}

// 提交题解
export const createSolutionAPI = (data) => {
    return request({
        url: '/api/solution/create/',
        method: 'POST',
        data: data
    })
}