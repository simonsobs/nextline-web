import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useCtrlTraceIdsQuery,
  useCtrlTraceIdsSSubscription,
} from "@/graphql/codegen/generated";

interface _TraceIdsSubscription {
  traceIds: ComputedRef<number[] | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlTraceIdsSSubscription>;
  query: ReturnType<typeof useCtrlTraceIdsQuery>;
}

type TraceIdsSubscription = _TraceIdsSubscription & PromiseLike<_TraceIdsSubscription>;

export function useSubscribeTraceIds(): TraceIdsSubscription {
  const query = useCtrlTraceIdsQuery({ requestPolicy: "network-only" });
  const subscription = useCtrlTraceIdsSSubscription({});

  const error = computed(() => subscription.error?.value || query.error?.value);

  const traceIds = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlTraceIds || query.data?.value?.ctrl.traceIds
  );

  const ret = { traceIds, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
