import { computed, ref, unref } from "vue";
import type { Ref } from "vue";
import { refThrottled } from "@vueuse/core";

import type { Connection } from "./type";

interface QueryResponse {
  fetching: Ref<boolean>;
  error: Ref<Error | undefined>;
  executeQuery: (opts?: { requestPolicy?: "network-only" }) => PromiseLike<any>;
}

export function useQueryState(queryResponse: QueryResponse) {
  const { refresh, refreshing } = useRefresh(queryResponse);
  const loading = computed(
    () => unref(queryResponse.fetching) || unref(refreshing)
  );
  const error = ref(queryResponse.error);
  return { loading, error, refresh };
}

function useRefresh(query: {
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

export function useConnection<Node>(
  connection: Ref<Connection<Node> | null | undefined>
) {
  const notFound = computed(() => connection.value === null);
  const edges = computed(
    () => connection.value?.edges.flatMap((e) => (e ? [e] : [])) || []
  );
  const nodes = computed<Node[]>(() =>
    edges.value.flatMap((e) => e.node || [])
  );
  const empty = computed(() => nodes.value.length === 0);

  return { notFound, edges, nodes, empty };
}
