import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";
import type { ComputedRef } from "vue";
import { computed } from "vue";

interface _RunNoSubscription {
  runNo: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlRunNoSSubscription>;
  query: ReturnType<typeof useCtrlRunNoQuery>;
}

type RunNoSubscription = _RunNoSubscription & PromiseLike<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useCtrlRunNoQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlRunNoSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const runNo = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlRunNo || query.data?.value?.ctrl.runNo
  );

  const ret = { runNo, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
