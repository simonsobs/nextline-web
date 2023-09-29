import { ref, computed } from "vue";
import type { Ref } from "vue";

import type { Edge } from "./type";

interface Query<Node> {
  loading: Ref<boolean>;
  error: Ref<Error | undefined>;
  notFound: Ref<boolean>;
  edges: Ref<Edge<Node>[]>;
  nodes: Ref<Node[]>;
  empty: Ref<boolean>;
}

export function useOverride<Node>(query: Query<Node>) {
  const override = ref({
    loading: false,
    error: false,
    empty: false,
    notFound: false,
  });

  const loading = computed(() => override.value.loading || query.loading.value);

  const empty = computed(() => override.value.empty || query.empty.value);
  const notFound = computed(
    () => override.value.notFound || query.notFound.value
  );

  const edges = computed(() =>
    override.value.empty || override.value.notFound ? [] : query.edges.value
  );

  const nodes = computed(() =>
    override.value.empty || override.value.notFound ? [] : query.nodes.value
  );

  const error = computed(() =>
    override.value.error ? new Error("test") : query.error.value
  );

  return { override, loading, empty, notFound, error, edges, nodes };
}
