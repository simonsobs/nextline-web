import { computed, unref, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";

import type { Connection } from "./type";

export function useUnpack<Node>(
  connection: MaybeRefOrGetter<Connection<Node> | null | undefined>
) {
  const value = computed(() => toValue(connection));
  const notFound = computed(() => unref(value) === null);
  const edges = computed(
    () => unref(value)?.edges.flatMap((e) => (e ? [e] : [])) || []
  );
  const nodes = computed<Node[]>(() => edges.value.flatMap((e) => e.node || []));
  const empty = computed(() => nodes.value.length === 0);

  return { connection: value, notFound, edges, nodes, empty };
}
