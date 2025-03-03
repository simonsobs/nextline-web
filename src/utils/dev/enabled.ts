import { useLocalStorage } from "@vueuse/core";

export function useDevTool() {
  const keyPrefix = import.meta.env.VITE_PUBLIC_PATH;
  const key = `${keyPrefix}/dev-tool`;
  const isDevToolEnabled = useLocalStorage(key, false);
  return { isDevToolEnabled };
}
