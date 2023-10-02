import { ref } from "vue";

export function useRefresh(query: {
  executeQuery: (ops?: { requestPolicy?: "network-only" }) => PromiseLike<any>;
}) {
  const refreshing = ref(false);

  const refresh = async () => {
    refreshing.value = true;
    await query.executeQuery({ requestPolicy: "network-only" });
    refreshing.value = false;
  };
  return { refresh, refreshing };
}
