import { computed } from "vue";
import type { MaybeRef } from "vue";

import { useSourceQuery } from "@/graphql/codegen/generated";

export async function useSource(fileName: MaybeRef<string>) {
  // @ts-ignore
  const query = useSourceQuery({ variables: { fileName } });
  const sourceLines = computed(() => query.data.value?.ctrl.source);
  const source = computed(() => sourceLines.value?.join("\n"));
  await query;
  return { source };
}
