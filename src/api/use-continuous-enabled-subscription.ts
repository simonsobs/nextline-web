import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useCtrlContinuousEnabledQuery,
  useCtrlContinuousEnabledSSubscription,
} from "@/graphql/codegen/generated";

interface _ContinuousEnabledSubscription {
  continuousEnabled: ComputedRef<boolean | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlContinuousEnabledSSubscription>;
  query: ReturnType<typeof useCtrlContinuousEnabledQuery>;
}

type ContinuousEnabledSubscription = _ContinuousEnabledSubscription &
  PromiseLike<_ContinuousEnabledSubscription>;

export function useSubscribeContinuousEnabled(): ContinuousEnabledSubscription {
  const query = useCtrlContinuousEnabledQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useCtrlContinuousEnabledSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const continuousEnabled = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlContinuousEnabled ||
        query.data?.value?.ctrl.continuousEnabled,
  );

  const ret = { continuousEnabled, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
