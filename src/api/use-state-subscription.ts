import type { ComputedRef, Ref } from "vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import type {
  CtrlStateQuery,
  CtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

type Query = UseQueryResponse<CtrlStateQuery>;
type Subscription = UseSubscriptionResponse<CtrlStateSSubscription>;

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type StateSubscription = OnReady<_StateSubscription>;

const mapQueryData = (d: Ref<CtrlStateQuery | undefined>) => d.value?.ctrl.state;

const mapSubscriptionData = (d: Ref<CtrlStateSSubscription | undefined>) =>
  d.value?.ctrlState;

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
