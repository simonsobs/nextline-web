import { computed } from "vue";
import type { Ref } from "vue";

import { useSubscribeScheduleAutoModeState } from "@/api";

interface _UsePullingReturn {
  pulling: Ref<boolean>;
}

type UsePullingReturn = _UsePullingReturn & PromiseLike<_UsePullingReturn>;

export function usePulling(): UsePullingReturn {
  const subscription = useSubscribeScheduleAutoModeState();

  // e.g., "off", "auto_pulling", "auto_running"
  const state = subscription.autoModeState;

  // true if the second part of the state is "pulling"
  const pulling = computed(() => state.value?.split("_")[1] === "pulling");

  const ret = { pulling };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await subscription;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
