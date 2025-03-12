import { computed } from "vue";
import { useTitle } from "@vueuse/core";

import { useConfig } from "@/utils/config";

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
