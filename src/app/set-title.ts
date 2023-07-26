import { computed } from "vue";
import { useTitle } from "@vueuse/core";
import { useConfigStore } from "@/stores/config";

function useSetTitle() {
  const configStore = useConfigStore();
  const title = computed(() => {
    if (configStore.loading) return "loading...";
    const appName = configStore.config?.appName || "";
    const apiName = configStore.config?.apiName || "";
    return `${appName}: ${apiName}`;
  });

  // https://vueuse.org/core/useTitle/
  return useTitle(title);
}

export { useSetTitle };
