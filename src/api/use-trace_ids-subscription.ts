import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useCtrlTraceIdsQuery,
  useCtrlTraceIdsSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _TraceIdsSubscription {
  data: ComputedRef<number[] | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlTraceIdsSSubscription>;
  query: ReturnType<typeof useCtrlTraceIdsQuery>;
}

type TraceIdsSubscription = OnReady<_TraceIdsSubscription>;

export function useSubscribeTraceIds(): TraceIdsSubscription {
  const query = useCtrlTraceIdsQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useCtrlTraceIdsSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const data = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlTraceIds || query.data?.value?.ctrl.traceIds,
  );

  const ret = { data, error, subscription, query };

  return onReady(ret, query);
}
