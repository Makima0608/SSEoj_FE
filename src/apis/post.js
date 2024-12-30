import request from '@/utils/http'
export const getPostAPI = (id) => {
  return request({
    url: `/api/post/${id}/information`,
  })
}

export const createPostAPI = (params) => {
  console.log(params)
  return request({
    url: `/api/post/new`,
    method: 'POST',
    data: params,
  })
}

export const likePostAPI = (params) => {
  return request({
    url: `/api/post/good`,
    method: 'PUT',
    data:{
      post_title: params.title,
      post_content: params.content
    }
  })
}
