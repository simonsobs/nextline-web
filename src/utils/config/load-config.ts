import { ref, computed } from "vue";
import { useFetch } from "@vueuse/core";
import * as path from "path";

export async function useLoadConfigT<T extends object>(
  defaultConfig: Partial<T> = {},
  validate: (config: T) => void = () => true
) {
  const { configUrl } = useConfigUrl();

  const {
    data,
    error: fetchError,
    isFinished,
  } = await useFetch<T>(configUrl, { refetch: true }).json<T>();

  // Initially false because of await. Can be true if configUrl is changed.
  const loading = computed(() => !isFinished.value);

  // null until data is loaded
  const toBeValidated = computed<T | null>(
    () => data.value && { ...defaultConfig, ...(data.value ?? {}) }
  );

  const validationError = computed(() => {
    if (loading.value) return;
    if (!toBeValidated.value) return;
    try {
      validate(toBeValidated.value);
    } catch (e: unknown) {
      // console.error(e);
      return e as Error;
    }
  });

  const error = computed(
    () => (fetchError.value as Error | undefined) || validationError.value
  );

  const config = computed<T | null>(() => (error.value ? null : toBeValidated.value));

  return {
    loading,
    error,
    config,
  };
}

function useConfigUrl() {
  const configUrl = ref(path.join(import.meta.env.VITE_PUBLIC_PATH, "config.json"));

  return {
    configUrl,
  };
}
