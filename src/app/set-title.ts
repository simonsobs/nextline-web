import { useConfig } from "@/utils/config";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";

function useSetTitle() {
  const { config } = useConfig();
  const title = computed(() => {
    const appName = config.value.appName;
    const apiName = config.value.apiName;
    return `${appName}: ${apiName}`;
  });

  // https://vueuse.org/core/useTitle/
  return useTitle(title);
}

export { useSetTitle };
