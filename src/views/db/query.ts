import { computed, ref, unref, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { refThrottled } from "@vueuse/core";

import type { Connection } from "./type";

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

export function useConnection<Node>(
  connection: MaybeRefOrGetter<Connection<Node> | null | undefined>
) {
  const value = computed(() => toValue(connection));
  const notFound = computed(() => unref(value) === null);
  const edges = computed(
    () => unref(value)?.edges.flatMap((e) => (e ? [e] : [])) || []
  );
  const nodes = computed<Node[]>(() =>
    edges.value.flatMap((e) => e.node || [])
  );
  const empty = computed(() => nodes.value.length === 0);

  return { connection: value, notFound, edges, nodes, empty };
}
