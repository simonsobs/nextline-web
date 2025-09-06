import { computed } from "vue";
import type { Component } from "vue";

import { useSubscribeState, useSubscribeScheduleAutoModeMode } from "@/api";

import ActionFinished from "./ActionFinished.vue";
import ActionInitialized from "./ActionInitialized.vue";
import ActionRunning from "./ActionRunning.vue";

export async function useActionComponent() {
  const autoModeStateSubscription = useSubscribeScheduleAutoModeMode();
  const { data: autoMode } = autoModeStateSubscription;

  const stateSubscription = useSubscribeState();
  const { data: state } = stateSubscription;

  const actionComponent = computed<Component | null>(() => {
    if (autoMode.value === "off") {
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
    } else {
      switch (state.value) {
        case "running":
          return ActionRunning;
        default:
          return null;
      }
    }
  });

  await Promise.all([autoModeStateSubscription, stateSubscription]);
  return { actionComponent };
}
