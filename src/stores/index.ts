import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("main", {
  state: () => {
    return {
      config: { apiName: null },
      modified: false,
    };
  },
  actions: {
    async loadConfig() {
      const url = `./config.json`;
      const response = await axios.get(url);
      // TODO: handle error
      const config = response.data;
      this.config = config;
    },
    setModified(v = true) {
      this.modified = v;
    },
  },
});
