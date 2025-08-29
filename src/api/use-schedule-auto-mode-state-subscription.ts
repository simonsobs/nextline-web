import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useQScheduleAutoModeStateQuery,
  useScheduleAutoModeStateSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _ScheduleAutoModeStateSubscription {
  autoModeState: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleAutoModeStateSSubscription>;
  query: ReturnType<typeof useQScheduleAutoModeStateQuery>;
}

type ScheduleAutoModeStateSubscription = OnReady<_ScheduleAutoModeStateSubscription>;

export function useSubscribeScheduleAutoModeState(): ScheduleAutoModeStateSubscription {
  const query = useQScheduleAutoModeStateQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useScheduleAutoModeStateSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const autoModeState = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.scheduleAutoModeState ||
        query.data?.value?.schedule.autoMode.state,
  );

  const ret = { autoModeState, error, subscription, query };

  return onReady(ret, query);
}
