import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      modified: false,
    };
  },
  actions: {
    setModified(v = true) {
      this.modified = v;
    },
  },
});
