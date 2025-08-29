import { computed } from "vue";
import type { Ref } from "vue";

import { useSubscribeScheduleAutoModeState } from "@/api";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _UsePullingReturn {
  pulling: Ref<boolean>;
}

type UsePullingReturn = OnReady<_UsePullingReturn>;

export function usePulling(): UsePullingReturn {
  const subscription = useSubscribeScheduleAutoModeState();

  // e.g., "off", "auto_pulling", "auto_running"
  const state = subscription.autoModeState;

  // true if the second part of the state is "pulling"
  const pulling = computed(() => state.value?.split("_")[1] === "pulling");

  const ret = { pulling };

  return onReady(ret, subscription);
}
