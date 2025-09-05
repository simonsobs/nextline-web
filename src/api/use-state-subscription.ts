import type { ComputedRef } from "vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

type Query = ReturnType<typeof useCtrlStateQuery>;
type Subscription = ReturnType<typeof useCtrlStateSSubscription>;

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type StateSubscription = OnReady<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.state;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlState;

  const options = { query, subscription, mapQueryData, mapSubscriptionData };
  const { data, error } = useQueryBackedSubscription(options);

  const ret = { state: data, error, subscription, query };

  return onReady(ret, query);
}
