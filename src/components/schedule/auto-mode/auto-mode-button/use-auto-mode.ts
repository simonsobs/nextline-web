import { computed } from "vue";
import type { Ref } from "vue";

import { useSubscribeScheduleAutoModeState } from "@/api";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _UseAutoModeReturn {
  autoMode: Ref<boolean>;
  pulling: Ref<boolean>;
}

type UseAutoModeReturn = OnReady<_UseAutoModeReturn>;

export function useAutoMode(): UseAutoModeReturn {
  const subscription = useSubscribeScheduleAutoModeState();

  // e.g., "off", "auto_pulling", "auto_running"
  const state = subscription.data;

  // true if the first part of the state is "auto"
  const autoMode = computed(() => state.value?.split("_")[0] === "auto");

  // true if the second part of the state is "pulling"
  const pulling = computed(() => state.value?.split("_")[1] === "pulling");

  const ret = { autoMode, pulling };

  return onReady(ret, subscription);
}
