import { computed } from "vue";
import type { Component } from "vue";

import { useScheduleStore } from "@/plugins/pinia/stores/schedule";

import {
  useQStateQuery,
  useStateSubscription,
} from "@/graphql/codegen/generated";
import { storeToRefs } from "pinia";
import ActionInitialized from "./ActionInitialized.vue";
import ActionRunning from "./ActionRunning.vue";
import ActionFinished from "./ActionFinished.vue";

export function useActionComponent() {
  const stateQuery = useQStateQuery();
  const stateSubscription = useStateSubscription();
  const state = computed(
    () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
  );

  const scheduleStore = useScheduleStore();
  const { autoMode } = storeToRefs(scheduleStore);

  const actionComponent = computed<Component | null>(() => {
    if (autoMode.value) {
      switch (state.value) {
        case "running":
          return ActionRunning;
        default:
          return null;
      }
    } else {
      switch (state.value) {
        case "initialized":
          return ActionInitialized;
        case "running":
          return ActionRunning;
        case "finished":
          return ActionFinished;
        default:
          return null;
      }
    }
  });
  return { actionComponent };
}
