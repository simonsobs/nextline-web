import { inject } from "vue";
import type { InjectionKey, Ref } from "vue";

export function useConfigT<T>(injectionKey: InjectionKey<Ref<T>>) {
  const config = inject(injectionKey);
  if (!config) throw Error("config is not provided");
  return { config };
}
