import { ref, computed } from "vue";

import { useLoadConfigT } from "./load-config";

export function useOverrideT<T extends object>(
  loadConfig: Awaited<ReturnType<typeof useLoadConfigT<T>>>,
) {
  const override = ref({
    loading: false,
    error: false,
    notFound: false,
  });

  const loading = computed(() => override.value.loading || loadConfig.loading.value);

  const error = computed(() =>
    override.value.error ? new Error("test") : loadConfig.error.value,
  );

  const notFound = computed(() => override.value.notFound);

  const config = computed(() =>
    override.value.notFound ? null : loadConfig.config.value,
  );

  return { override, loading, error, notFound, config };
}
