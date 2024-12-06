import { defineStore } from "pinia";
import { getTagsAPI } from "@/apis/utils";
import { ref } from "vue";

export const useTagsStore = defineStore('tags', () => {
    const idToTags = ref({})
    const tagsToID = ref({})
    const getTags = async() => {
        const res = await getTagsAPI()
        console.log(res.data)
        res.data.forEach(item => {
            tagsToID.value[item.name] = item.id
            idToTags.value[item.id] = {name: item.name, parent: item.parent}
        });
    }

    return {
        idToTags,
        tagsToID,
        getTags
    }
})