import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";

/**
 * Response returned by `useQuery()` / `useSubscription()`.
 *
 * `T` is the data type, the equivalent to the first argument of `UseQueryResponse` and
 * `UseSubscriptionResponse`.
 */
interface Response<T> {
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
}

/**
 * Options for the `useMappedWithFallback` composable.
 *
 * The interface includes two responses and two mapping functions. The two responses are
 * primary and secondary, which are typically returned by `useSubscription()` and
 * `useQuery()`, respectively. The two mapping functions convert the respective response
 * data into a common target type `T`. The secondary response is used as a fallback when
 * the primary response data is `undefined`.
 *
 * @template T The target type that both mappers should produce
 * @template D1 The data type of Response<D1>["data"]
 * @template D2 The data type of Response<D2>["data"]
 * @template R1 The primary response type, typically `UseSubscriptionResponse<D1>`
 * @template R2 The fallback response type, typically `UseQueryResponse<D2>`
 *
 */
export interface UseMappedWithFallbackOptions<
  T,
  D2,
  D1,
  R2 extends Response<D2>,
  R1 extends Response<D1>,
> {
  /** The fallback response source, typically returned by `useQuery()` */
  response2: R2;

  /** The primary response source, typically returned by `useSubscription()` */
  response1: R1;

  /** Mapping function for the fallback response data. `d` is `response2.data` */
  map2: (d: Ref<D2 | undefined>) => T | undefined;

  /** Mapping function for the primary response data. `d` is `response1.data` */
  map1: (d: Ref<D1 | undefined>) => T | undefined;
}

/**
 * Return type of `useMappedWithFallback()`.
 *
 * The returned object contains two reactive properties: `data` and `error`.
 */
interface UseMappedWithFallbackReturn<T> {
  /**
   * The reactive value mapped primarily from `response1` with fallback to `response2`.
   * `undefined` if either response has an error.
   */
  data: ComputedRef<T | undefined>;

  /**
   * The error from `response1` otherwise from `response2` else `undefined`
   */
  error: ComputedRef<Error | undefined>;
}

/**
 * A reactive mapped value from a primary response with secondary fallback.
 *
 * @param options {@link UseMappedWithFallbackOptions}
 * @returns {@link UseMappedWithFallbackReturn}
 * @example
 * ```typescript
 * const subscription = useSubscription<D1>({ query: SUBSCRIPTION_QUERY });
 * const query = useQuery<D2>({ query: QUERY });
 *
 * const { data, error } = useMappedWithFallback({
 *   response1: subscription, // primary: real-time updates
 *   response2: query,        // fallback: initial data
 *   map1: (d) => d.value?.ctrlState,
 *   map2: (d) => d.value?.ctrl.state,
 * });
 * ```
 */
export function useMappedWithFallback<
  T,
  D2,
  D1,
  R2 extends Response<D2>,
  R1 extends Response<D1>,
>(
  options: UseMappedWithFallbackOptions<T, D2, D1, R2, R1>,
): UseMappedWithFallbackReturn<T> {
  const error = computed(
    () => options.response1.error?.value ?? options.response2.error?.value,
  );

  const data = computed(() =>
    error.value
      ? undefined
      : (options.map1(options.response1.data) ?? options.map2(options.response2.data)),
  );

  return { data, error };
}
