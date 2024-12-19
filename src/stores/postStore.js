import { defineStore } from "pinia";
import { getPostAPI } from "@/apis/post";
import { ref } from "vue";

export const usePostStore = defineStore('post', () => {
    const post = ref({})
    const getPost = async(id) => {
        const res = await getPostAPI(id)
        post.value = res.data
        console.log(post.value)
    }

    return {
        post,
        getPost,
    }
})
