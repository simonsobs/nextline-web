<template>
  <div class="g-container">
    <div class="g-breadcrumb">
      <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
    </div>
    <v-data-table :loading="loading" :headers="headers" :items="items" class="g-table">
      <template #top>
        <v-btn variant="text" icon="mdi-refresh" @click="refresh"> </v-btn>
      </template>
      <template #item.actions="{ item }">
        <v-btn
          variant="text"
          icon="mdi-delete"
          density="comfortable"
          @click="deleteItem(item)"
        >
        </v-btn>
      </template>
      <template #bottom></template>
    </v-data-table>
    <v-btn
      variant="flat"
      size="x-large"
      color="tertiary-container"
      elevation="8"
      icon="mdi-plus-thick"
      style="position: fixed; bottom: 24px; right: 24px"
    >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const breadcrumb = [{ title: "Queue", disabled: false }];
const loading = ref(false);
const headers = [
  { title: "column A", key: "columnA" },
  { title: "", key: "actions", sortable: false, align: "end" as const },
];
const items = ref([{ columnA: "value 1" }, { columnA: "value 2" }]);

async function refresh() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
}

function deleteItem(item: any) {
  const index = items.value.indexOf(item);
  items.value.splice(index, 1);
}
</script>

<style scoped>
.g-container {
  position: relative;
  display: grid;
  padding: 12px;
  justify-content: center;
  grid-template-columns: minmax(100px, 960px);
  grid-template-rows: min-content 1fr;
  grid-template-areas: "breadcrumb" "table";
}

.g-breadcrumb {
  grid-area: breadcrumb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-table {
  grid-area: table;
}
</style>
