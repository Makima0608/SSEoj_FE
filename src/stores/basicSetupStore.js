import { defineStore } from "pinia";

export const useLanguageStore = defineStore('langs', () => {
    const languageList = ["C", "C++", "Java", "Python"]
    return {
        languageList
    }
})
