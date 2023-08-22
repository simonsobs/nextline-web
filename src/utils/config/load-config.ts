import { ref, computed, toValue } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import * as path from "path";

export function useLoadConfigT<T extends object>(
  defaultConfig: Partial<T> = {},
  validate: (config: T) => void = () => true
) {
  const { configUrl } = useConfigUrl();

  const {
    data,
    error: axiosError,
    isLoading: loading,
  } = useAxios<T>(toValue(configUrl));

  // undefined until data is loaded
  const config = computed<T | undefined>(
    () => data.value && { ...defaultConfig, ...(data.value ?? {}) }
  );

  const validationError = computed(() => {
    if (loading.value) return;
    if (!config.value) return;
    try {
      validate(config.value);
    } catch (e) {
      return e;
    }
  });

  const error = computed(() => axiosError.value || validationError.value);

  return {
    loading,
    error,
    config,
  };
}

function useConfigUrl() {
  const configUrl = ref(
    path.join(import.meta.env.VITE_PUBLIC_PATH, "config.json")
  );

  return {
    configUrl,
  };
}
