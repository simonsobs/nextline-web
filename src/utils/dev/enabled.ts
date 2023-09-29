import { useLocalStorage } from "@vueuse/core";

export function useDevTool() {
  const isDevToolEnabled = useLocalStorage("dev-tool", false);
  return { isDevToolEnabled };
}
