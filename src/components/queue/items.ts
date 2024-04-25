import { nextTick, ref } from "vue";
import type { Ref } from "vue";
import { formatDateTime } from "@/utils/format-date-time";

export interface Item {
  name: string;
  createdAt?: string;
  script: string;
}

interface _UseItemsResponse {
  items: Ref<Item[]>;
  loading: Ref<boolean>;
  refresh: () => Promise<void>;
  addItem: (item: Item) => Promise<void>;
  deleteItem: (item: Item) => Promise<void>;
}

type UseItemsResponse = _UseItemsResponse & PromiseLike<_UseItemsResponse>;

const items = ref<Item[]>([]);
// items.value = loadItems();

export function useItems(): UseItemsResponse {
  const loading = ref(false);

  // const items = ref<Item[]>([]);

  nextTick(async () => {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    items.value = loadItems();
    loading.value = false;
  });

  async function refresh() {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
  }

  async function addItem(newItem: { name: string; script: string }) {
    loading.value = true;
    const dateTime = new Date().toISOString().replace("Z", "");
    const createdAt = formatDateTime(dateTime); // UTC
    const item = { ...newItem, createdAt };
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
    items.value.push(item);
  }

  async function deleteItem(item: any) {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
    const index = items.value.indexOf(item);
    items.value.splice(index, 1);
  }

  const ret = { items, loading, refresh, addItem, deleteItem };

  return {
    ...ret,
    async then(onFulfilled, onRejected) {
      return Promise.resolve(ret).then(onFulfilled, onRejected);
    },
  };
}

function loadItems(): Item[] {
  const items = [
    {
      name: "Item 1",
      createdAt: formatDateTime("2024-04-05T15:30:00Z"),
      script: [
        "import time",
        "",
        "time.sleep(1.9)",
        "time.sleep(2.6)",
        "time.sleep(1.3)",
        "time.sleep(1.0)",
        "time.sleep(2.9)",
        "time.sleep(2.4)",
        "time.sleep(1.2)",
        "time.sleep(2.0)",
      ].join("\n"),
    },
    {
      name: "Item 2",
      createdAt: formatDateTime("2024-04-05T18:30:00Z"),
      script: [
        "import time",
        "",
        "time.sleep(2.2)",
        "time.sleep(2.7)",
        "time.sleep(3.0)",
        "time.sleep(1.4)",
        "time.sleep(1.8)",
        "time.sleep(2.3)",
        "time.sleep(1.8)",
        "time.sleep(1.9)",
        "time.sleep(2.4)",
        "time.sleep(1.5)",
      ].join("\n"),
    },
    {
      name: "Item 3",
      // name: "Item 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: formatDateTime("2024-04-05T21:30:00Z"),
      script: [
        "import time",
        "",
        "time.sleep(1.5)",
        "time.sleep(2.3)",
        "time.sleep(1.7)",
        "time.sleep(2.1)",
        "time.sleep(2.5)",
      ].join("\n"),
    },
    {
      name: "Item 4",
      createdAt: formatDateTime("2024-04-05T23:30:00Z"),
      script: [
        "import time",
        "",
        "time.sleep(0.2)",
        "time.sleep(0.7)",
        "time.sleep(1.0)",
        "time.sleep(1.4)",
        "time.sleep(1.8)",
        "time.sleep(2.3)",
        "time.sleep(1.8)",
      ].join("\n"),
    },
  ];
  return items;
}
