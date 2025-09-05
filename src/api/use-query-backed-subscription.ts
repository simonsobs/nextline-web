import { computed } from "vue";
import type { Ref } from "vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";

type QueryData<Q> = Q extends UseQueryResponse<infer Data, any> ? Data : never;
type SubscriptionData<S> =
  S extends UseSubscriptionResponse<infer Data, any, any> ? Data : never;

export interface UseQueryBackedSubscriptionOptions<
  T,
  Q extends UseQueryResponse<any, any>,
  S extends UseSubscriptionResponse<any, any, any>,
> {
  query: Q;
  subscription: S;
  mapQueryData: (queryData: Ref<QueryData<Q> | undefined>) => T | undefined;
  mapSubscriptionData: (
    subscriptionData: Ref<SubscriptionData<S> | undefined>,
  ) => T | undefined;
}

export function useQueryBackedSubscription<
  T,
  Q extends UseQueryResponse<any, any>,
  S extends UseSubscriptionResponse<any, any, any>,
>(options: UseQueryBackedSubscriptionOptions<T, Q, S>) {
  const error = computed(
    () => options.subscription.error?.value ?? options.query.error?.value,
  );

  const data = computed(() =>
    error.value
      ? undefined
      : (options.mapSubscriptionData(options.subscription.data) ??
        options.mapQueryData(options.query.data)),
  );

  return { data, error };
}
