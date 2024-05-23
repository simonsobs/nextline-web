import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useQScheduleAutoModeStateQuery,
  useScheduleAutoModeStateSSubscription,
} from "@/graphql/codegen/generated";

interface _ScheduleAutoModeStateSubscription {
  autoModeState: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleAutoModeStateSSubscription>;
  query: ReturnType<typeof useQScheduleAutoModeStateQuery>;
}

type ScheduleAutoModeStateSubscription = _ScheduleAutoModeStateSubscription &
  PromiseLike<_ScheduleAutoModeStateSubscription>;

export function useSubscribeScheduleAutoModeState(): ScheduleAutoModeStateSubscription {
  const query = useQScheduleAutoModeStateQuery({ requestPolicy: "network-only" });
  const subscription = useScheduleAutoModeStateSSubscription();

  const error = computed(() => subscription.error?.value || query.error?.value);

  const autoModeState = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.scheduleAutoModeState ||
        query.data?.value?.schedule.autoMode.state
  );

  const ret = { autoModeState, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
