import request from '@/utils/http';

export const getCommentAPI = (params) => {
  // 解构出 id，剩余参数用 rest 运算符保存
  const { id, ...queryParams } = params;
  return request({
    url: `/api/post/${id}/comments`,
    method: 'GET',
    data:{
      page:params.page_num,
      page_size:params.page_size
    }
  });
};

export const likeCommentAPI = (params) => {
  return request({
    url: `/api/post/comment/good`,
    method: 'POST',
    data: {
      is_good:params.is_good,
      id:params.comment_id
    }
  })
}
