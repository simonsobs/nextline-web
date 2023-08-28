import { ref, computed, watchEffect } from "vue";

import { useSourceQuery, useResetMutation } from "@/graphql/codegen/generated";

export function useSource() {
  const query = useSourceQuery();
  const savedSourceLines = computed(() => query.data.value?.source || []);
  const savedSource = computed(() => savedSourceLines.value.join("\n"));

  const source = ref("");
  watchEffect(() => {
    source.value = savedSource.value;
  });

  const modified = computed(() => source.value !== savedSource.value);

  const { executeMutation } = useResetMutation();

  async function save() {
    await executeMutation({ statement: source.value });
    query.executeQuery();
  }

  function reset() {
    query.executeQuery();
    source.value = savedSource.value;
  }

  return { source, modified, save, reset };
}
