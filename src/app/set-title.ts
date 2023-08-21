import { computed, toValue } from "vue";
import { useTitle } from "@vueuse/core";
import { useConfig } from "@/utils/config";

function useSetTitle() {
  const { config } = useConfig();
  const title = computed(() => {
    const appName = toValue(config).appName;
    const apiName = toValue(config).apiName;
    return `${appName}: ${apiName}`;
  });

  // https://vueuse.org/core/useTitle/
  return useTitle(title);
}

export { useSetTitle };
