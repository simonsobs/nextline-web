import { ref, watchEffect } from "vue";
import type { Ref } from "vue";
import type { OperationResult, AnyVariables } from "@urql/vue";
import { formatDateTime } from "@/utils/format-date-time";
import { useSubscribeScheduleQueueItems } from "@/api/use-schedule-queue-items-subscription";
import {
  useScheduleQueuePushMutation,
  useScheduleQueueRemoveMutation,
  useScheduleQueueMoveToFirstMutation,
  useScheduleQueueMoveOneForwardMutation,
  useScheduleQueueMoveToLastMutation,
  useScheduleQueueMoveOneBackwardMutation,
} from "@/graphql/codegen/generated";
import type {
  ScheduleQueuePushInput,
  ScheduleQueuePushMutation,
  ScheduleQueueRemoveMutation,
  ScheduleQueueMoveToFirstMutation,
  ScheduleQueueMoveOneForwardMutation,
  ScheduleQueueMoveToLastMutation,
  ScheduleQueueMoveOneBackwardMutation,
} from "@/graphql/codegen/generated";

export interface Item {
  order: number;
  id: number;
  name: string;
  createdAt?: string;
  script: string;
}

type AddItemResult = OperationResult<ScheduleQueuePushMutation, AnyVariables>;
type DeleteItemResult = OperationResult<ScheduleQueueRemoveMutation, AnyVariables>;

type MoveItemToTopResult = OperationResult<
  ScheduleQueueMoveToFirstMutation,
  AnyVariables
>;
type MoveItemOneUpResult = OperationResult<
  ScheduleQueueMoveOneForwardMutation,
  AnyVariables
>;
type MoveItemOneDownResult = OperationResult<
  ScheduleQueueMoveOneBackwardMutation,
  AnyVariables
>;
type MoveItemToBottomResult = OperationResult<
  ScheduleQueueMoveToLastMutation,
  AnyVariables
>;

interface _UseItemsResponse {
  items: Ref<Item[]>;
  loading: Ref<boolean>;
  addItem: (item: ScheduleQueuePushInput) => Promise<AddItemResult>;
  deleteItem: (item: Item) => Promise<DeleteItemResult>;
  moveItemToTop: (item: Item) => Promise<MoveItemToTopResult>;
  moveItemOneUp: (item: Item) => Promise<MoveItemOneUpResult>;
  moveItemOneDown: (item: Item) => Promise<MoveItemOneDownResult>;
  moveItemToBottom: (item: Item) => Promise<MoveItemToBottomResult>;
}

type UseItemsResponse = _UseItemsResponse & PromiseLike<_UseItemsResponse>;

export function useItems(): UseItemsResponse {
  const subscription = useSubscribeScheduleQueueItems();
  const { items: items_, loading } = subscription;

  const items = ref<Item[]>([]);
  const itemMap = ref<Map<number, Item>>(new Map());
  watchEffect(() => {
    // Update the list of items as the subscription updates.
    // Keep the same Item objects in the list.
    // itemMap is used to keep track of the Item objects.

    // Remove items from itemMap that are no longer in the subscription.
    items_.value
      ?.map((item) => item.id)
      .forEach((id) => {
        if (!itemMap.value.has(id)) itemMap.value.delete(id);
      });

    // Empty the items list.
    items.value.splice(0, items.value.length);

    // Update
    items_.value?.forEach((item, index) => {
      const update = {
        order: index + 1,
        id: item.id,
        name: item.name,
        createdAt: formatDateTime(item.createdAt),
        script: item.script,
      };
      const item_ = itemMap.value.get(item.id);
      if (item_) {
        Object.assign(item_, update); // Update the existing item object.
        items.value.push(item_);
      } else {
        itemMap.value.set(item.id, update); // new item object.
        items.value.push(update);
      }
    });
  });

  const { addItem } = useAddItem();
  const { deleteItem } = useDeleteItem();
  const { moveItemToTop } = useMoveItemToTop();
  const { moveItemOneUp } = useMoveItemOneUp();
  const { moveItemOneDown } = useMoveItemOneDown();
  const { moveItemToBottom } = useMoveItemToBottom();

  const ret = {
    items,
    loading,
    addItem,
    deleteItem,
    moveItemToTop,
    moveItemOneUp,
    moveItemOneDown,
    moveItemToBottom,
  };

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
    return await executeMutation({ input: newItem });
  }
  return { addItem };
}

function useDeleteItem() {
  const { executeMutation } = useScheduleQueueRemoveMutation();
  async function deleteItem(item: Item) {
    return await executeMutation({ id: item.id });
  }

  return { deleteItem };
}

function useMoveItemToTop() {
  const { executeMutation } = useScheduleQueueMoveToFirstMutation();
  async function moveItemToTop(item: Item) {
    return await executeMutation({ id: item.id });
  }

  return { moveItemToTop };
}

function useMoveItemOneUp() {
  const { executeMutation } = useScheduleQueueMoveOneForwardMutation();
  async function moveItemOneUp(item: Item) {
    return await executeMutation({ id: item.id });
  }

  return { moveItemOneUp };
}

function useMoveItemOneDown() {
  const { executeMutation } = useScheduleQueueMoveOneBackwardMutation();
  async function moveItemOneDown(item: Item) {
    return await executeMutation({ id: item.id });
  }

  return { moveItemOneDown };
}

function useMoveItemToBottom() {
  const { executeMutation } = useScheduleQueueMoveToLastMutation();
  async function moveItemToBottom(item: Item) {
    return await executeMutation({ id: item.id });
  }

  return { moveItemToBottom };
}
