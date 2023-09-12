import { inject } from "vue";
import type { InjectionKey, Ref } from "vue";

import { injectionKey } from "./key";

export function useConfigT<T>() {
  const config = inject(injectionKey as InjectionKey<Ref<T>>);
  if (!config) throw Error("config is not provided");
  return { config };
}
