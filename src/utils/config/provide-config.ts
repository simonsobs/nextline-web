import { ref, provide, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter, InjectionKey, Ref } from "vue";

/**
 * Provide the config of type `T` to the child components.
 * In the child components, use `useConfig` to get the config.
 */
export function useProvideConfigT<T>(
  injectionKey: InjectionKey<Ref<T>>,
  config: MaybeRefOrGetter<T>
) {
  const configRef = ref(toValue(config)) as Ref<T>;
  watchEffect(() => {
    configRef.value = toValue(config);
  });
  provide(injectionKey, configRef);
}
