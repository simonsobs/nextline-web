import { computed } from "vue";
import { defineStore } from "pinia";
import { useScheduleAutoModeStateSubscription } from "@/gql/graphql";

export const useScheduleStore = defineStore("schedule", () => {
  const autoModeStateSubscription = useScheduleAutoModeStateSubscription();
  const autoModeState = computed(
    () => autoModeStateSubscription.data?.value?.scheduleAutoModeState
  );

  const autoMode = computed(() => {
    const s = autoModeState.value;
    if (s === "off") return false;
    if (s === "waiting" || s?.startsWith("auto")) return true;
    return null;
  });

  return {
    autoMode,
    autoModeState,
  };
});
