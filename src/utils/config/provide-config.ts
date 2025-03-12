import type { InjectionKey, Ref, ShallowRef } from "vue";
import { isRef, provide, shallowRef } from "vue";

import { injectionKey } from "./key";

export function useProvideConfigT<T>(config: T | ShallowRef<T>) {
  const configRef = isRef(config) ? config : shallowRef(config);
  provide(injectionKey as InjectionKey<Ref<T>>, configRef);
  return { config: configRef };
}
