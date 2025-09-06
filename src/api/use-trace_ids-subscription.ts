import {
  useCtrlTraceIdsQuery,
  useCtrlTraceIdsSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

export function useSubscribeTraceIds() {
  const query = useCtrlTraceIdsQuery({ requestPolicy: "network-only", variables: {} });
  const subscription = useCtrlTraceIdsSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.traceIds;
  const mapSubscriptionData = (d: typeof subscription.data) => d.value?.ctrlTraceIds;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
