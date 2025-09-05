import { computed } from "vue";
import type { Ref } from "vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";

type QueryData<Q> = Q extends UseQueryResponse<infer Data, any> ? Data : never;
type SubscriptionData<S> =
  S extends UseSubscriptionResponse<infer Data, any, any> ? Data : never;

export function useQueryBackedSubscription<
  T,
  Q extends UseQueryResponse<any, any>,
  S extends UseSubscriptionResponse<any, any, any>,
>(
  query: Q,
  subscription: S,
  mapQueryData: (queryData: Ref<QueryData<Q>>) => T | undefined,
  mapSubscriptionData: (
    subscriptionData: Ref<SubscriptionData<S> | undefined>,
  ) => T | undefined,
) {
  const error = computed(() => subscription.error?.value ?? query.error?.value);

  const data = computed(() =>
    error.value
      ? undefined
      : (mapSubscriptionData(subscription.data) ?? mapQueryData(query.data)),
  );

  return { data, error };
}
