import { defineStore } from "pinia";
import { getCommentAPI } from "@/apis/comment";
import { ref } from "vue";

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([])
  const count = ref(0)

  const getComments = async (id) => {
    const res = await getCommentAPI(id);
    console.log(res);
    count.value = res.data.count; // 更新 .value
    comments.value = res.data.comments; // 更新 .value
};


  return {
      count,
      comments,
      getComments,
  }
})
