import request from '@/utils/http';

export const getCommentAPI = (params) => {
  // 解构出 id，剩余参数用 rest 运算符保存
  const { id, ...queryParams } = params;
  return request({
    url: `/api/post/${id}/comments`,
    method: 'GET',
    params: queryParams, // 剩余参数作为查询参数传递
  });
};
