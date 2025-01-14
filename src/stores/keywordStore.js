import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeywordStore = defineStore('keyword', () => {
  const keyword = ref(undefined);

  function setKeyword(value) {
    keyword.value = value;
  }

  function clearKeyword(value) {
    keyword.value = undefined;
  }

  return { keyword, setKeyword, clearKeyword };
});
