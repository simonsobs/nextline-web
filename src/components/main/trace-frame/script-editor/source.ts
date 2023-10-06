import { ref, computed, watchEffect } from "vue";

import {
  useSourceQuery,
  useResetMutation,
  useLoadScriptMutation,
} from "@/graphql/codegen/generated";

export async function useSource() {
  const query = useSourceQuery();
  const savedSourceLines = computed(() => query.data.value?.source || []);
  const savedSource = computed(() => savedSourceLines.value.join("\n"));

  const source = ref("");
  watchEffect(() => {
    source.value = savedSource.value;
  });

  const modified = computed(() => source.value !== savedSource.value);

  const { executeMutation: executeMutationReset } = useResetMutation();

  async function save() {
    await executeMutationReset({ statement: source.value });
    query.executeQuery();
  }

  function reset() {
    query.executeQuery();
    source.value = savedSource.value;
  }

  const { executeMutation: executeMutationLoad } = useLoadScriptMutation();

  async function load() {
    await executeMutationLoad({});
    query.executeQuery();
  }

  await query;

  return { source, modified, save, reset, load };
}
