import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useQStateQuery, useStateSubscription } from "@/graphql/codegen/generated";

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useStateSubscription>;
  query: ReturnType<typeof useQStateQuery>;
}

type StateSubscription = _StateSubscription & PromiseLike<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useQStateQuery({ requestPolicy: "network-only" });
  const subscription = useStateSubscription({});

  const error = computed(() => subscription.error?.value || query.error?.value);

  const state = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlState || query.data?.value?.ctrl.state
  );

  const ret = { state, error, subscription, query };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await query;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}
