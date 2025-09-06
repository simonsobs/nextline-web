import type { ComputedRef } from "vue";

import {
  useQScheduleAutoModeStateQuery,
  useScheduleAutoModeStateSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

interface _ScheduleAutoModeStateSubscription {
  data: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
}

type ScheduleAutoModeStateSubscription = _ScheduleAutoModeStateSubscription &
  PromiseLike<_ScheduleAutoModeStateSubscription>;

export function useSubscribeScheduleAutoModeState(): ScheduleAutoModeStateSubscription {
  const query = useQScheduleAutoModeStateQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useScheduleAutoModeStateSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.schedule.autoMode.state;
  const mapSubscriptionData = (d: typeof subscription.data) =>
    d.value?.scheduleAutoModeState;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
