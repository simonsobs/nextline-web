import type { ComputedRef } from "vue";

import {
  useScheduleAutoModeModeQuery,
  useScheduleAutoModeModeSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

// type AutoMode = "off" | "scheduler" | "queue";

interface _ScheduleAutoModeModeSubscription {
  data: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
}

type ScheduleAutoModeModeSubscription = _ScheduleAutoModeModeSubscription &
  PromiseLike<_ScheduleAutoModeModeSubscription>;

export function useSubscribeScheduleAutoModeMode(): ScheduleAutoModeModeSubscription {
  const query = useScheduleAutoModeModeQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useScheduleAutoModeModeSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.schedule.autoMode.mode;
  const mapSubscriptionData = (d: typeof subscription.data) =>
    d.value?.scheduleAutoModeMode;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
