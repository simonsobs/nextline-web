import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlStateSSubscription>;
  query: ReturnType<typeof useCtrlStateQuery>;
}

type StateSubscription = OnReady<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const state = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.ctrlState || query.data?.value?.ctrl.state,
  );

  const ret = { state, error, subscription, query };

  return onReady(ret, query);
}
