import { ref, provide, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter, InjectionKey, Ref } from "vue";
import type { Config } from "./config";

export const injectionKey: InjectionKey<Ref<Config>> = Symbol("config");

export function useProvideConfig(config: MaybeRefOrGetter<Config>) {
  const configRef = ref(toValue(config));
  watchEffect(() => {
    configRef.value = toValue(config);
  });
  provide(injectionKey, configRef);
}
