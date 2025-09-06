import {
  useCtrlContinuousEnabledQuery,
  useCtrlContinuousEnabledSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

export function useSubscribeContinuousEnabled() {
  const query = useCtrlContinuousEnabledQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useCtrlContinuousEnabledSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.ctrl.continuousEnabled;
  const mapSubscriptionData = (d: typeof subscription.data) =>
    d.value?.ctrlContinuousEnabled;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
