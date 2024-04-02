import { computed } from "vue";
import type { ComputedRef } from "vue";

import { useSubscribeScheduleAutoModeState } from "./use-schedule-auto-mode-state-subscription";

type AutoMode = 'off' | 'scheduler'

interface _ScheduleAutoModeSubscription {
  autoMode: ComputedRef<AutoMode | undefined>;
  error: ComputedRef<Error | undefined>;
}

type ScheduleAutoModeSubscription = _ScheduleAutoModeSubscription &
  PromiseLike<_ScheduleAutoModeSubscription>;

export function useSubscribeScheduleAutoMode(): ScheduleAutoModeSubscription {
  const subscription = useSubscribeScheduleAutoModeState();
  const { autoModeState, error } = subscription;

  const autoMode = computed(() => {
    const s = autoModeState.value;
    if (s === "off") return 'off';
    if (s === "waiting" || s?.startsWith("auto")) return 'scheduler';
    return undefined;
  });
  const ret = { autoMode, error };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await subscription;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
