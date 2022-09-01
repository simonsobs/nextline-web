import { defineStore } from "pinia";
import axios from "axios";
import * as path from 'path';

export const useStore = defineStore("main", {
  state: () => {
    return {
      config: { apiName: null },
      modified: false,
    };
  },
  actions: {
    async loadConfig() {
      const url = path.relative(
        window.location.pathname,
        `${process.env.VUE_APP_PUBLIC_PATH}/config.json`
      );
      // TODO: test if this works when the public path is not "/"
      try {
        const response = await axios.get(url);
        const config = response.data;
        this.config = config;
      } catch (error) {
        // TODO: handle error
      }
    },
    setModified(v = true) {
      this.modified = v;
    },
  },
});
