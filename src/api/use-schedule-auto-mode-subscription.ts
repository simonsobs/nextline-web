import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useQScheduleAutoModeStateQuery,
  useScheduleAutoModeStateSubscription,
} from "@/graphql/codegen/generated";

interface _ScheduleAutoModeSubscription {
  autoMode: ComputedRef<boolean | undefined>;
  autoModeState: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleAutoModeStateSubscription>;
  query: ReturnType<typeof useQScheduleAutoModeStateQuery>;
}

type ScheduleAutoModeSubscription = _ScheduleAutoModeSubscription &
  PromiseLike<_ScheduleAutoModeSubscription>;

export function useSubscribeScheduleAutoMode(): ScheduleAutoModeSubscription {
  const query = useQScheduleAutoModeStateQuery({ requestPolicy: "network-only" });
  const subscription = useScheduleAutoModeStateSubscription();

  const error = computed(() => subscription.error?.value || query.error?.value);

  const autoModeState = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.scheduleAutoModeState ||
        query.data?.value?.schedule.autoMode.state
  );

  const autoMode = computed(() => {
    const s = autoModeState.value;
    if (s === "off") return false;
    if (s === "waiting" || s?.startsWith("auto")) return true;
    return undefined;
  });
  const ret = { autoMode, autoModeState, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
