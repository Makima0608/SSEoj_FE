import { defineStore } from "pinia";
import { getProblemSetAPI } from "@/apis/problemset";
import { ref } from "vue";

export const useProblemsetStore = defineStore('problemset', () => {
    const problemset = ref([])
    const total = ref(0)

    const getProblemSet = async (params) => {
        const res = await getProblemSetAPI(params)
        console.log(res)
        total.value = res.data.total
        problemset.value = res.data.problems
    }

    return {
        problemset,
        total,
        getProblemSet,
    }
})
