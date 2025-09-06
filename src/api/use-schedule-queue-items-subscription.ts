import {
  useScheduleQueueItemsQuery,
  useScheduleQueueItemsSSubscription,
} from "@/graphql/codegen/generated";

import { useQueryBackedSubscription } from "./use-query-backed-subscription";

export function useSubscribeScheduleQueueItems() {
  const query = useScheduleQueueItemsQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useScheduleQueueItemsSSubscription({ variables: {} });

  const mapQueryData = (d: typeof query.data) => d.value?.schedule.queue.items;
  const mapSubscriptionData = (d: typeof subscription.data) =>
    d.value?.scheduleQueueItems;

  return useQueryBackedSubscription({
    query,
    subscription,
    mapQueryData,
    mapSubscriptionData,
  });
}
