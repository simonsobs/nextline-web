import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";

import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useMappedWithFallback } from "./use-mapped-with-fallback";

interface UseQueryBackedSubscriptionOptions<T, Q, S> {
  query: UseQueryResponse<Q>;
  subscription: UseSubscriptionResponse<S>;
  mapQueryData: (d: Ref<Q | undefined>) => T | undefined;
  mapSubscriptionData: (d: Ref<S | undefined>) => T | undefined;
}

type UseQueryBackedSubscriptionReturn<T> = OnReady<{
  data: ComputedRef<T | undefined>;
  error: ComputedRef<Error | undefined>;
  loading: ComputedRef<boolean>;
}>;

export function useQueryBackedSubscription<T, Q, S>(
  options: UseQueryBackedSubscriptionOptions<T, Q, S>,
): UseQueryBackedSubscriptionReturn<T> {
  const mapped = useMappedWithFallback({
    response1: options.subscription,
    response2: options.query,
    map1: options.mapSubscriptionData,
    map2: options.mapQueryData,
  });
  const loading = computed(() => options.query.fetching?.value);

  const ret = { ...mapped, loading };
  return onReady(ret, options.query);
}
