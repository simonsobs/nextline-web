import type { ComputedRef, Ref } from "vue";
import type { UseSubscriptionResponse } from "@urql/vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

type Query = ReturnType<typeof useCtrlStateQuery>;

type Subscription = ReturnType<typeof useCtrlStateSSubscription>;
// type SubscriptionData = Subscription["data"]; // Doesn't work. Becomes unknown

type _SD = Subscription extends UseSubscriptionResponse<infer D, any, any> ? D : never;
type SubscriptionData = Ref<_SD | undefined>;

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type StateSubscription = OnReady<_StateSubscription>;

const mapQueryData = (d: Query["data"]) => d.value?.ctrl.state;
const mapSubscriptionData = (d: SubscriptionData) => d.value?.ctrlState;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const { data, error } = useQueryBackedSubscription(
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  );

  const ret = { state: data, error, subscription, query };

  return onReady(ret, query);
}
