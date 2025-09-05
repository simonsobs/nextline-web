import type { ComputedRef } from "vue";
import { computed } from "vue";

import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _RunNoSubscription {
  runNo: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useCtrlRunNoSSubscription>;
  query: ReturnType<typeof useCtrlRunNoQuery>;
}

type RunNoSubscription = OnReady<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useCtrlRunNoQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useCtrlRunNoSSubscription({ variables: {} });

  const error = computed(() => subscription.error?.value || query.error?.value);

  const runNo = computed(() =>
    error.value
      ? undefined
      : (subscription.data?.value?.ctrlRunNo ?? query.data?.value?.ctrl.runNo),
  );

  const ret = { runNo, error, subscription, query };

  return onReady(ret, query);
}
