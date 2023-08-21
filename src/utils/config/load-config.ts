import { ref, computed } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import * as path from "path";

import { defaultConfig, validateConfig } from "./config";
import type { Config } from "./config";

export function useLoadConfig() {
  const url = ref(path.join(import.meta.env.VITE_PUBLIC_PATH, "config.json"));

  const {
    data,
    error: axiosError,
    isLoading: loading,
  } = useAxios<Config>(url.value);

  // undefined until data is loaded
  const config = computed(
    () => data.value && { ...defaultConfig, ...(data.value ?? {}) }
  );

  const typeError = computed(() => {
    if (loading.value) return;
    if (!config.value) return;
    try {
      validateConfig(config.value);
    } catch (e) {
      return e;
    }
  });

  const error = computed(() => axiosError.value || typeError.value);

  return {
    url,
    loading,
    error,
    config,
  };
}
