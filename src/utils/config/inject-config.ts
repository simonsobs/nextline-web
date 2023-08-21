import { inject } from "vue";
import { injectionKey } from "./provide-config";

export function useConfig() {
  const config = inject(injectionKey);
  if (!config) throw Error("config is not provided");
  return { config };
}
