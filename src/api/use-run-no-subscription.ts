import type { ComputedRef } from "vue";

import {
  useCtrlRunNoQuery,
  useCtrlRunNoSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

interface _RunNoSubscription {
  data: ComputedRef<number | undefined>;
  error: ComputedRef<Error | undefined>;
}

type RunNoSubscription = _RunNoSubscription & PromiseLike<_RunNoSubscription>;

export function useSubscribeRunNo(): RunNoSubscription {
  const query = useCtrlRunNoQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlRunNoSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.runNo;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlRunNo;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
