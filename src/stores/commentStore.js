import { defineStore } from "pinia";
import { getCommentAPI,likeCommentAPI } from "@/apis/comment";
import { ref } from "vue";

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([])
  const count = ref(0)

  const getComments = async (id) => {
    const res = await getCommentAPI(params);
    console.log(res);
    count.value = res.data.count; // 更新 .value
    comments.value = res.data.comments; // 更新 .value
  };
  // 点赞
  const likeComment = async (params) => {
    const res = await likeCommentAPI(params);
    console.log(params);
  };

  return {
      count,
      comments,
      getComments,
      likeComment,
  }
})
