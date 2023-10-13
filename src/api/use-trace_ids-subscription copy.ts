import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  useQTraceIdsQuery,
  useTraceIdsSubscription,
} from "@/graphql/codegen/generated";

interface _TraceIdsSubscription {
  traceIds: ComputedRef<number[] | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useTraceIdsSubscription>;
  query: ReturnType<typeof useQTraceIdsQuery>;
}

type TraceIdsSubscription = _TraceIdsSubscription & PromiseLike<_TraceIdsSubscription>;

export function useSubscribeTraceIds(): TraceIdsSubscription {
  const query = useQTraceIdsQuery({ requestPolicy: "network-only" });
  const subscription = useTraceIdsSubscription();

  const error = computed(() => subscription.error?.value || query.error?.value);

  const traceIds = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.traceIds || query.data?.value?.traceIds
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
