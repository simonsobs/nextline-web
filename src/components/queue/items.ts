import { computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { formatDateTime } from "@/utils/format-date-time";
import { useSubscribeScheduleQueueItems } from "@/api/use-schedule-queue-items-subscription";
import {
  useScheduleQueuePushMutation,
  useScheduleQueueRemoveMutation,
} from "@/graphql/codegen/generated";
import type { ScheduleQueuePushInput } from "@/graphql/codegen/generated";

export interface Item {
  id: number;
  name: string;
  createdAt?: string;
  script: string;
}

interface _UseItemsResponse {
  items: ComputedRef<Item[] | undefined>;
  loading: Ref<boolean>;
  addItem: (item: ScheduleQueuePushInput) => Promise<void>;
  deleteItem: (item: Item) => Promise<void>;
}

type UseItemsResponse = _UseItemsResponse & PromiseLike<_UseItemsResponse>;

export function useItems(): UseItemsResponse {
  const subscription = useSubscribeScheduleQueueItems();
  const { items: items_, loading } = subscription;

  const items = computed<Item[] | undefined>(() =>
    items_.value?.map((item) => ({
      id: item.id,
      name: item.name,
      createdAt: formatDateTime(item.createdAt),
      script: item.script,
    }))
  );

  const { addItem } = useAddItem();
  const { deleteItem } = useDeleteItem();

  const ret = { items, loading, addItem, deleteItem };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      await subscription;
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}

function useAddItem() {
  const { executeMutation } = useScheduleQueuePushMutation();

  async function addItem(newItem: ScheduleQueuePushInput) {
    await executeMutation({ input: newItem });
  }
  return { addItem };
}

function useDeleteItem() {
  const { executeMutation } = useScheduleQueueRemoveMutation();
  async function deleteItem(item: Item) {
    await executeMutation({ id: item.id });
  }

  return { deleteItem };
}
