<template>
  <div class="queue-frame">
    <div class="g-container">
      <div class="g-breadcrumb">
        <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      </div>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        class="g-table"
      >
        <template #top>
          <v-btn variant="text" icon="mdi-refresh" @click="refresh"> </v-btn>
        </template>
        <template #item.index="{ index }">
          {{ index }}
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
    </div>
    <v-btn
      variant="flat"
      size="x-large"
      color="tertiary-container"
      elevation="8"
      icon="mdi-plus-thick"
      class="fab"
    >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const breadcrumb = [{ title: "Queue", disabled: false }];
const loading = ref(false);
const headers = [
  { title: "Index", key: "index", sortable: false },
  { title: "Column A", key: "columnA", sortable: false },
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
.queue-frame {
  /* Frame to place the fab button */
  position: relative;
  margin: auto;
  padding: 12px;
  block-size: 100%;
  /* max-inline-size: 960px; */
  max-inline-size: 984px; /* 960 + 2 * 12 (padding). so to match History page */
}

.fab {
  /* Fab button */
  position: absolute;
  bottom: 24px;
  right: 24px;
}

.g-container {
  position: relative;
  display: grid;
  overflow-y: auto;
  block-size: 100%;
  padding-bottom: calc(64px + 24px); /* 64px is the height of the fab button */
  justify-content: center;
  grid-template-columns: 1fr;
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
