import { ref, computed } from "vue";
import type { Ref } from "vue";

import type { Connection, Edge } from "./type";

interface QueryResponse {
  fetching: Ref<boolean>;
  error: Ref<Error | undefined>;
}

interface Unpacked<Node> {
  notFound: Ref<boolean>;
  connection: Ref<Connection<Node> | null | undefined>;
  edges: Ref<Edge<Node>[]>;
  nodes: Ref<Node[]>;
  empty: Ref<boolean>;
}

export function useOverride<Node>(
  queryResponse: QueryResponse,
  unpacked: Unpacked<Node>
) {
  const override = ref({
    fetching: false,
    error: false,
    empty: false,
    notFound: false,
  });

  const fetching = computed(
    () => override.value.fetching || queryResponse.fetching.value
  );

  const empty = computed(() => override.value.empty || unpacked.empty.value);
  const notFound = computed(() => override.value.notFound || unpacked.notFound.value);

  const connection = computed(() => {
    if (override.value.notFound) return null;
    if (override.value.empty)
      return { ...unpacked.connection.value, totalCount: 0, edges: [] };
    return unpacked.connection.value;
  });

  const edges = computed(() =>
    override.value.empty || override.value.notFound ? [] : unpacked.edges.value
  );

  const nodes = computed(() =>
    override.value.empty || override.value.notFound ? [] : unpacked.nodes.value
  );

  const error = computed(() =>
    override.value.error ? new Error("test") : queryResponse.error.value
  );

  return {
    override,
    fetching,
    empty,
    notFound,
    error,
    connection,
    edges,
    nodes,
  };
}
