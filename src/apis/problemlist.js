import request from '@/utils/http'

// 获取公开题单列表
export const getProblemListAPI = (params) => {
    return request({
        url: '/api/problemlist/',
        params,
    })
}

// 获取题单信息
export const getProblemListDetailAPI = (id) => {
    return request({
        url: `/api/problemlist/${id}/`
    })
}

// 收藏题单
export const starProblemListAPI = (id, is_star) => {
    return request({
        url: '/api/problemlist/star/',
        method: 'POST',
        data: {
            problemlist_id: id,
            is_star: is_star
        }
    })
}

//转存题单
export const transferProblemListAPI = (id) => {
    return request({
        url: '/api/problemlist/transfer/',
        method: 'POST',
        data: {
            id: id
        }
    })
}

// 创建题单
export const createProblemListAPI = (data) => {
    return request({
        url: '/api/problemlist/create/',
        method: 'POST',
        data: data
    })
}
// 编辑题单
export const editProblemListAPI = (problemlist_id, data) => {
    return request({
        url: `/api/problemlist/${problemlist_id}/`,
        method: 'PUT',
        data: data
    })
}

export const deleteProblemListAPI = (problemlist_id) => {
  return request({
    url: `/api/problemlist/${problemlist_id}/`,
    method: 'DELETE'
  })
}
