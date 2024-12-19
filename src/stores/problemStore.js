import { defineStore } from "pinia";
import { getProblemDescAPI } from "@/apis/problem";
import { ref } from "vue";

export const useProblemDescStore = defineStore('problemDesc', () => {
    const problemDesc = ref({})
    const getProblemDesc = async(id) => {
        const res = await getProblemDescAPI(id)
        problemDesc.value = res.data
        console.log(problemDesc)
    }

    return {
        problemDesc,
        getProblemDesc
    }
})
