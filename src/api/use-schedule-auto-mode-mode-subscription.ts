import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useQScheduleAutoModeModeQuery,
  useScheduleAutoModeModeSubscription,
} from "@/graphql/codegen/generated";

// type AutoMode = "off" | "scheduler" | "queue";

interface _ScheduleAutoModeModeSubscription {
  autoModeMode: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleAutoModeModeSubscription>;
  query: ReturnType<typeof useQScheduleAutoModeModeQuery>;
}

type ScheduleAutoModeModeSubscription = _ScheduleAutoModeModeSubscription &
  PromiseLike<_ScheduleAutoModeModeSubscription>;

export function useSubscribeScheduleAutoModeMode(): ScheduleAutoModeModeSubscription {
  const query = useQScheduleAutoModeModeQuery({ requestPolicy: "network-only" });
  const subscription = useScheduleAutoModeModeSubscription();

  const error = computed(() => subscription.error?.value || query.error?.value);

  const autoModeMode = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.scheduleAutoModeMode ||
        query.data?.value?.schedule.autoMode.mode
  );

  const ret = { autoModeMode, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
