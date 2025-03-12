import * as path from "path";

import type { ShallowRef } from "vue";
import { computed, ref, shallowRef, watchEffect } from "vue";
import { useFetch } from "@vueuse/core";

/**
 * Asynchronously loads and manages a configuration object with validation and error handling.
 *
 * @template - The type of the configuration object, must extend object.
 * @param - The default configuration object to use as a base.
 * @param - A function to validate the configuration object.
 *
 * @returns
 *   - loading: A computed ref indicating whether the config is currently loading.
 *   - error: A ref containing any fetch or validation errors.
 *   - config: A shallow ref containing the current valid configuration.
 *   - execute: A function to manually trigger a config refresh.
 *
 * @throws Throws an error if the initial fetch fails or if validation fails on the initial fetch.
 *
 * @description
 * This function fetches a configuration object from a URL, merges it with a default config,
 * validates it, and provides reactive references to the resulting data and state.
 * It handles both initial and subsequent fetches, with different error behaviors for each:
 * - On initial fetch: Throws an error if fetch fails or validation fails.
 * - On subsequent fetches: Updates error state but doesn't throw, keeps old config if validation fails.
 *
 * @example
 * ```typescript
 * const { config, loading, error, execute } = await useLoadConfigT(defaultConfig, validateConfig);
 * // Use config.value to access the current configuration
 * // Use loading.value to check if a fetch is in progress
 * // Use error.value to check for any errors
 * // Call execute() to manually refresh the configuration
 * ```
 */
export async function useLoadConfigT<T extends object>(
  defaultConfig: Partial<T> = {},
  validate: (config: T) => void = () => true,
) {
  const { configUrl } = useConfigUrl();

  const {
    data,
    error: fetchError,
    isFinished,
    execute,
  } = await useFetch<T>(configUrl, { refetch: true }).json<T>();

  // Initially false because of await. Can become true later.
  const loading = computed(() => !isFinished.value);

  const toBeValidated = computed<T | null>(
    () => data.value && { ...defaultConfig, ...(data.value ?? {}) },
  );

  const validationError = ref<Error | undefined>(undefined);
  const error = ref<Error | undefined>(undefined);
  let validConfig!: ShallowRef<T> | undefined;
  watchEffect(
    () => {
      if (loading.value) return;
      if (toBeValidated.value) {
        try {
          validate(toBeValidated.value);
          validationError.value = undefined;
        } catch (e: unknown) {
          validationError.value = e as Error;
        }
      }
      error.value = (fetchError.value as Error | undefined) || validationError.value;
      if (error.value) return;
      const rawValidConfig = toBeValidated.value;
      if (rawValidConfig === null) return;
      if (validConfig === undefined) {
        validConfig = shallowRef<T>(rawValidConfig);
      } else {
        validConfig.value = rawValidConfig;
      }
    },
    { flush: "sync" },
  );

  if (error.value) {
    throw Error(`Failed to load config: ${error.value.message}`);
  }

  if (validConfig === undefined) {
    throw Error("The config is undefined while no error occurred.");
  }

  return {
    loading,
    error,
    config: validConfig,
    execute,
  };
}

function useConfigUrl() {
  const configUrl = ref(path.join(import.meta.env.VITE_PUBLIC_PATH, "config.json"));

  return {
    configUrl,
  };
}
