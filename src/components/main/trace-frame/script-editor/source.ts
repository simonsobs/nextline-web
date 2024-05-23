import { ref, computed, watchEffect } from "vue";

import {
  useCtrlSourceQuery,
  useCtrlResetMutation,
  useScheduleSchedulerLoadScriptMutation,
  useCtrlLoadExampleScriptMutation,
} from "@/graphql/codegen/generated";
import { useStore } from "@/plugins/pinia/stores/main";

export async function useSource() {
  const query = useCtrlSourceQuery({});
  const savedSourceLines = computed(() => query.data.value?.ctrl.source || []);
  const savedSource = computed(() => savedSourceLines.value.join("\n"));

  const source = ref("");
  watchEffect(() => {
    source.value = savedSource.value;
  });

  const modified = computed(() => source.value !== savedSource.value);

  const store = useStore();
  watchEffect(() => {
    store.setModified(modified.value);
  });

  const { executeMutation: executeMutationReset } = useCtrlResetMutation();

  async function save() {
    await executeMutationReset({ statement: source.value });
    query.executeQuery();
  }

  function reset() {
    query.executeQuery();
    source.value = savedSource.value;
  }

  const { executeMutation: executeMutationLoad } = useScheduleSchedulerLoadScriptMutation();

  async function load() {
    await executeMutationLoad({});
    query.executeQuery();
  }

  const { executeMutation: executeMutationLoadExample } =
    useCtrlLoadExampleScriptMutation();

  async function loadExample() {
    await executeMutationLoadExample({});
    query.executeQuery();
  }

  await query;

  return { source, modified, save, reset, load, loadExample };
}
