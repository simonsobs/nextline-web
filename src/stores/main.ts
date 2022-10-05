import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("main", () => {
  const modified = ref(false);
  function setModified(value: boolean) {
    modified.value = value;
  }
  return { modified, setModified };
});
