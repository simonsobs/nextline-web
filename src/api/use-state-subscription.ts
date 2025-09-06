import type { ComputedRef } from "vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

interface _StateSubscription {
  data: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
}

type StateSubscription = _StateSubscription & PromiseLike<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.state;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlState;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
