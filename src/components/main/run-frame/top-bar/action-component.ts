import { computed } from "vue";
import type { Component } from "vue";
import { storeToRefs } from "pinia";

import { useScheduleStore } from "@/plugins/pinia/stores/schedule";
import { useSubscribeState } from "@/api";

import ActionInitialized from "./ActionInitialized.vue";
import ActionRunning from "./ActionRunning.vue";
import ActionFinished from "./ActionFinished.vue";

export async function useActionComponent() {
  const scheduleStore = useScheduleStore();
  const { autoMode } = storeToRefs(scheduleStore);

  const stateSubscription = useSubscribeState();
  const { state } = stateSubscription;

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

  await stateSubscription;
  return { actionComponent };
}
