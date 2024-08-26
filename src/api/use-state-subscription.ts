import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import type { ComputedRef } from "vue";
import { computed } from "vue";

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlStateSSubscription>;
  query: ReturnType<typeof useCtrlStateQuery>;
}

type StateSubscription = _StateSubscription & PromiseLike<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlStateSSubscription({ variables: {} });

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
