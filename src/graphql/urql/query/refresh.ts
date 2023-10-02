import { ref } from "vue";
import { refThrottled } from "@vueuse/core";

export function useRefresh(query: {
  executeQuery: (ops?: { requestPolicy?: "network-only" }) => PromiseLike<any>;
}) {
  const _refreshing = ref(false);

  // Throttle so as to avoid flickering
  const refreshing = refThrottled(_refreshing, 300);

  const refresh = async () => {
    _refreshing.value = true;
    await query.executeQuery({ requestPolicy: "network-only" });
    _refreshing.value = false;
  };
  return { refresh, refreshing };
}
