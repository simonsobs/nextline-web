import { computed } from "vue";
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

type Query = UseQueryResponse<CtrlStateQuery, CtrlStateQueryVariables>;

type Subscription = UseSubscriptionResponse<
  CtrlStateSSubscription,
  CtrlStateSSubscription,
  CtrlStateSSubscriptionVariables
>;

type ExtractQueryData<Q> = Q extends UseQueryResponse<infer Data, any> ? Data : never;
type ExtractSubscriptionData<S> =
  S extends UseSubscriptionResponse<infer Data, any, any> ? Data : never;

function useQueryBackedSubscription<
  T,
  Q extends UseQueryResponse<any, any>,
  S extends UseSubscriptionResponse<any, any, any>,
>(
  query: Q,
  subscription: S,
  mapQueryData: (queryData: Ref<ExtractQueryData<Q>>) => T | undefined,
  mapSubscriptionData: (
    subscriptionData: Ref<ExtractSubscriptionData<S> | undefined>,
  ) => T | undefined,
) {
  const error = computed(() => subscription.error?.value || query.error?.value);

  const data = computed(() =>
    error.value
      ? undefined
      : mapSubscriptionData(subscription.data) || mapQueryData(query.data),
  );

  return { data, error };
}
interface _StateSubscriptionDev {
  data: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

interface StateSubscriptionDev {
  ret: _StateSubscriptionDev;
  query: Query;
}

export function useSubscribeStateDev(): StateSubscriptionDev {
  const query = useCtrlStateQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  type SubscriptionData = CtrlStateSSubscription;
  type QueryData = CtrlStateQuery;
  const subscription = useCtrlStateSSubscription({ variables: {} });

  const mapSubscriptionData = (subscriptionData: Ref<SubscriptionData | undefined>) =>
    subscriptionData.value?.ctrlState;
  const mapQueryData = (queryData: Ref<QueryData | undefined>) =>
    queryData.value?.ctrl.state;

  const { data, error } = useQueryBackedSubscription(
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  );

  const ret = { data, error, subscription, query };

  return { ret, query };
}

interface _StateSubscription {
  state: ComputedRef<string | undefined>;
  error: ComputedRef<Error | undefined>;
  subscription: Subscription;
  query: Query;
}

type StateSubscription = OnReady<_StateSubscription>;

export function useSubscribeState(): StateSubscription {
  const { ret, query } = useSubscribeStateDev();
  const { data: state, ...rest } = ret;
  const ret_ = { state, ...rest };

  return onReady(ret_, query);
}
