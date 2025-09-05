import { computed } from "vue";
import type { Ref } from "vue";

/**
 * Minimal reactive response returned by `useQuery()` / `useSubscription()`.
 *
 * T is the data type, the equivalent to the first argument of `UseQueryResponse` and
 * `UseSubscriptionResponse`.
 */
interface Response<T> {
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
}

/**
 * Options for the `useQueryBackedSubscription` composable.
 *
 * Generics:
 * - T: resulting mapped type produced by `mapQueryData`/`mapSubscriptionData`.
 * - QueryData: the GraphQL query payload type (the type inside `query.data`).
 * - SubscriptionData: the GraphQL subscription payload type (the type inside
 *   `subscription.data`).
 * - Query/Subscription: the reactive response shapes returned by `useQuery()` /
 *   `useSubscription()`.
 *
 * `query` should be the value returned by `useQuery()`, and `subscription` the value
 * returned by `useSubscription()`. Both mapping functions receive the corresponding
 * `data` `Ref` and must return `T | undefined`.
 */
export interface UseQueryBackedSubscriptionOptions<
  T,
  QueryData,
  SubscriptionData,
  Query extends Response<QueryData>,
  Subscription extends Response<SubscriptionData>,
> {
  query: Query;
  subscription: Subscription;
  mapQueryData: (queryData: Ref<QueryData | undefined>) => T | undefined;
  mapSubscriptionData: (
    subscriptionData: Ref<SubscriptionData | undefined>,
  ) => T | undefined;
}

/**
 * Combine a query and a subscription into a single reactive value.
 *
 * Returns an object with `data` (a computed `T | undefined`) and `error` (a computed
 * `Error | undefined`).
 * - `data` prefers values produced by `mapSubscriptionData` (subscription updates) and
 *   falls back to `mapQueryData` (the latest query result) when subscription hasn't
 *   produced a value.
 * - `error` yields the subscription error if present, otherwise the query error.
 *
 * The `map*` functions receive the corresponding `data` `Ref` (from `useQuery()` /
 * `useSubscription()`) and must return a `T | undefined`.
 *
 * Typical usage: pass the return values of the generated `useQuery()` and
 * `useSubscription()` hooks as `query` and `subscription`.
 */
export function useQueryBackedSubscription<
  T,
  QueryData,
  SubscriptionData,
  Query extends Response<QueryData>,
  Subscription extends Response<SubscriptionData>,
>(
  options: UseQueryBackedSubscriptionOptions<
    T,
    QueryData,
    SubscriptionData,
    Query,
    Subscription
  >,
) {
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
