import { ref, provide, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter, InjectionKey, Ref } from "vue";
import type { Config } from "./config";

export const injectionKey: InjectionKey<Ref<Config>> = Symbol("config");

/**
 * Provide the config to the child components.
 * In the child components, use `useConfig` to get the config.
 */
export function useProvideConfig(config: MaybeRefOrGetter<Config>) {
  const configRef = ref(toValue(config));
  watchEffect(() => {
    configRef.value = toValue(config);
  });
  provide(injectionKey, configRef);
}
