import { ref } from "vue";

interface QueryResponse {
  executeQuery: (ops: { requestPolicy: "network-only" }) => PromiseLike<any>;
}

export function useRefresh(queryResponse: QueryResponse) {
  const refreshing = ref(false);

  const refresh = async () => {
    refreshing.value = true;
    await queryResponse.executeQuery({ requestPolicy: "network-only" });
    refreshing.value = false;
  };
  return { refresh, refreshing };
}
