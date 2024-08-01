import { ref, provide, watchEffect, toValue } from "vue";
import type { MaybeRefOrGetter, InjectionKey, Ref } from "vue";

import { injectionKey } from "./key";
/**
 * Provides a configuration of type `T` to child components.
 *
 * This function creates a reactive reference to the config and provides it
 * to child components using Vue's provide/inject system.
 *
 * @template T The type of the configuration object
 * @param The configuration, which can be:
 *        - A value of type T
 *        - A Ref<T | null>
 *        - A getter function returning T or null
 *
 * @remarks
 * In child components, use `useConfig` to retrieve this provided config.
 * The config will only be provided once it has a non-null value.
 * Subsequent updates to the config (including to undefined) will be reflected
 * in the provided reference, but will not trigger a new provide.
 */
export function useProvideConfigT<T>(
  config: Exclude<MaybeRefOrGetter<T | null>, null>
) {
  const configRef = ref<T>() as Ref<T>;
  let provided = false;

  watchEffect(() => {
    const value = toValue(config);
    if (value === null) return;
    configRef.value = value;
    if (provided) return;
    provide(injectionKey as InjectionKey<Ref<T>>, configRef);
    provided = true;
  });
}
