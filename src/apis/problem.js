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
        url: `/api/problem/${id}/solutions/`,
        params
    })
}

// 题解点赞 API
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

// 获取提交列表
export const getSubmissionsAPI = (id, params) => {
    return request({
        url: `/api/problem/${id}/submissions/`,
        params: params
    })
}

// 提交题目
export const submitProblemAPI = (data) => {
    console.log(data)
    return request({
        url: '/api/problem/submit/',
        method: 'POST',
        data: data
    })
}

// 收藏至默认题单
export const starToDefaultProblemAPI = (id) => {
    return request({
        url: '/api/problem/star/',
        method: 'POST',
        data: {
            id: id
        }
    })
}
// 收藏至创建题单
export const starToProblemListAPI = (data) => {
    return request({
        url: '/api/problemlist/add_problem/',
        method: 'POST',
        data: data
    })
}

// 加入做题计划
export const addToStudyPlanAPI = (id) => {
    return request({
        url: '/api/study_plan/add/',
        method: 'POST',
        data: {
            id: id
        }
    })
}
