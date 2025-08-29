import type { ComputedRef } from "vue";
import { computed } from "vue";

import type { ScheduleQueueItem } from "@/graphql/codegen/generated";
import {
  useScheduleQueueItemsQuery,
  useScheduleQueueItemsSSubscription,
} from "@/graphql/codegen/generated";
import { onReady } from "@/utils/on-ready";
import type { OnReady } from "@/utils/on-ready";

interface _ScheduleQueueItemsSubscription {
  items: ComputedRef<ScheduleQueueItem[] | undefined>;
  loading: ComputedRef<boolean>;
  error: ComputedRef<Error | undefined>;
  subscription: ReturnType<typeof useScheduleQueueItemsSSubscription>;
  query: ReturnType<typeof useScheduleQueueItemsQuery>;
}

type ScheduleQueueItemsSubscription = OnReady<_ScheduleQueueItemsSubscription>;

export function useSubscribeScheduleQueueItems(): ScheduleQueueItemsSubscription {
  const query = useScheduleQueueItemsQuery({
    requestPolicy: "network-only",
    variables: {},
  });
  const subscription = useScheduleQueueItemsSSubscription({ variables: {} });

  const loading = computed(() => query.fetching?.value);
  const error = computed(() => subscription.error?.value || query.error?.value);

  const items = computed(() =>
    error.value
      ? undefined
      : subscription.data?.value?.scheduleQueueItems ||
        query.data?.value?.schedule.queue.items,
  );

  const ret = { items, loading, error, subscription, query };

  return onReady(ret, query);
}
