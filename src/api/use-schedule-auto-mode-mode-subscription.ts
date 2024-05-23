import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useScheduleAutoModeModeQuery,
  useScheduleAutoModeModeSSubscription,
} from "@/graphql/codegen/generated";

// type AutoMode = "off" | "scheduler" | "queue";

interface _ScheduleAutoModeModeSubscription {
  autoModeMode: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleAutoModeModeSSubscription>;
  query: ReturnType<typeof useScheduleAutoModeModeQuery>;
}

type ScheduleAutoModeModeSubscription = _ScheduleAutoModeModeSubscription &
  PromiseLike<_ScheduleAutoModeModeSubscription>;

export function useSubscribeScheduleAutoModeMode(): ScheduleAutoModeModeSubscription {
  const query = useScheduleAutoModeModeQuery({ requestPolicy: "network-only" });
  const subscription = useScheduleAutoModeModeSSubscription();

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
