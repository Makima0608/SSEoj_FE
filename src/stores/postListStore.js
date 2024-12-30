import { defineStore } from "pinia";
import { getPostListAPI } from "@/apis/postList";
import { ref } from "vue";

export const usePostListStore = defineStore('postList', () => {
  const postList = ref([])
  const count = ref(0)

  const getPostList = async (params) => {
    const res = await getPostListAPI(params);
    count.value = res.data.count; // 更新 .value
    postList.value = res.data.post_list; // 更新 .value
};


  return {
      count,
      postList,
      getPostList,
  }
})
