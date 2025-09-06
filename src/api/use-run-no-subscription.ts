import type { ComputedRef } from "vue";

import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useMappedWithFallback } from "./use-mapped-with-fallback";

interface _RunNoSubscription {
  data: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
}

type RunNoSubscription = OnReady<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useCtrlRunNoQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlRunNoSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.runNo;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlRunNo;

  const options = {
    response1: subscription,
    response2: query,
    map1: mapSubscriptionData,
    map2: mapQueryData,
  };
  const ret = useMappedWithFallback(options);

  return onReady(ret, query);
}
