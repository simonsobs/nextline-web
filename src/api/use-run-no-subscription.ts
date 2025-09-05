import type { ComputedRef } from "vue";

import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useMappedWithFallback } from "./use-query-backed-subscription";

type Query = ReturnType<typeof useCtrlRunNoQuery>;
type Subscription = ReturnType<typeof useCtrlRunNoSSubscription>;

interface _RunNoSubscription {
  runNo: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type RunNoSubscription = OnReady<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useCtrlRunNoQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlRunNoSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.runNo;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlRunNo;

  const options = {
    response2: query,
    response1: subscription,
    map2: mapQueryData,
    map1: mapSubscriptionData,
  };
  const { data, error } = useMappedWithFallback(options);

  const ret = { runNo: data, error, subscription, query };

  return onReady(ret, query);
}
