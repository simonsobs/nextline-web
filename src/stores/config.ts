import { ref, watchEffect } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import * as path from "path";

interface Config {
  apiName?: string;
  apiHttp?: string;
}

export const useConfigStore = defineStore("config", () => {
  const url = ref(path.join(import.meta.env.VITE_PUBLIC_PATH, "config.json"));
  const loading = ref(true);
  const error = ref<any>(null);
  const config = ref<Config>();

  watchEffect(async () => {
    error.value = null;
    try {
      const response = await axios.get<Config>(url.value);
      config.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return {
    url,
    loading,
    error,
    config,
  };
});
