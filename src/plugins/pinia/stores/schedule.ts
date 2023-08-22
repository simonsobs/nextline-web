import { computed } from "vue";
import { defineStore } from "pinia";
import {
  useQScheduleAutoModeStateQuery,
  useScheduleAutoModeStateSubscription,
} from "@/graphql/codegen/generated";

export const useScheduleStore = defineStore("schedule", () => {
  const autoModeStateQuery = useQScheduleAutoModeStateQuery();
  const autoModeStateSubscription = useScheduleAutoModeStateSubscription();
  const autoModeState = computed(
    () =>
      autoModeStateSubscription.data?.value?.scheduleAutoModeState ||
      autoModeStateQuery.data?.value?.schedule.autoMode.state
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
