import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useQRunNoQuery, useRunNoSubscription } from "@/graphql/codegen/generated";

interface _RunNoSubscription {
  runNo: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useRunNoSubscription>;
  query: ReturnType<typeof useQRunNoQuery>;
}

type RunNoSubscription = _RunNoSubscription & PromiseLike<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useQRunNoQuery({ requestPolicy: "network-only" });
  const subscription = useRunNoSubscription();

  const error = computed(() => subscription.error?.value || query.error?.value);

  const runNo = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.runNo || query.data?.value?.runNo
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
