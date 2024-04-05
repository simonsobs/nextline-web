import { ref } from "vue";

export function useItems() {
  const loading = ref(false);

  const items = ref([
    { columnA: "value 1" },
    { columnA: "value 2" },
    { columnA: "value 3" },
    { columnA: "value 4" },
    { columnA: "value 5" },
    { columnA: "value 6" },
    { columnA: "value 7" },
    { columnA: "value 8" },
    { columnA: "value 9" },
    { columnA: "value 10" },
    { columnA: "value 11" },
    { columnA: "value 12" },
    { columnA: "value 13" },
    { columnA: "value 14" },
    { columnA: "value 15" },
    { columnA: "value 16" },
    { columnA: "value 17" },
    { columnA: "value 18" },
    { columnA: "value 19" },
    { columnA: "value 20" },
  ]);

  async function refresh() {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;
  }

  function deleteItem(item: any) {
    const index = items.value.indexOf(item);
    items.value.splice(index, 1);
  }

  return { items, loading, refresh, deleteItem };
}
