import type { ComputedRef, Ref } from "vue";
import type { UseQueryResponse, UseSubscriptionResponse } from "@urql/vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";
import type {
  CtrlStateQuery,
  CtrlStateQueryVariables,
  CtrlStateSSubscription,
  CtrlStateSSubscriptionVariables,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

type Query = UseQueryResponse<CtrlStateQuery, CtrlStateQueryVariables>;

type Subscription = UseSubscriptionResponse<
  CtrlStateSSubscription,
  CtrlStateSSubscription,
  CtrlStateSSubscriptionVariables
>;

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type StateSubscription = OnReady<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const query = useCtrlStateQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  type SubscriptionData = CtrlStateSSubscription;
  type QueryData = CtrlStateQuery;
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const mapQueryData = (queryData: Ref<QueryData | undefined>) =>
    queryData.value?.ctrl.state;

  const mapSubscriptionData = (subscriptionData: Ref<SubscriptionData | undefined>) =>
    subscriptionData.value?.ctrlState;

  const { data, error } = useQueryBackedSubscription(
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  );

  const ret = { state: data, error, subscription, query };

  return onReady(ret, query);
}
