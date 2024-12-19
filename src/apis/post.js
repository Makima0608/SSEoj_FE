import request from '@/utils/http'
export const getPostAPI = (id) => {
  return request({
    url: `/api/post/${id}/information`,
  })
}
