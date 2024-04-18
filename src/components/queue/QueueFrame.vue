<template>
  <div class="queue-frame">
    <div class="g-container">
      <div class="g-breadcrumb">
        <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      </div>
      <div class="g-table">
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="items"
          :items-per-page="-1"
          @click-:row="showViewDialog = true"
          @click:row="onClickRow"
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
    </div>
    <v-btn
      variant="flat"
      size="x-large"
      color="primary-fixed"
      elevation="2"
      icon="mdi-plus-thick"
      class="fab"
    >
    </v-btn>
    <view-dialog v-model="item"> </view-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UnwrapRef } from "vue";
import { useItems } from "./items";

import ViewDialog from "./ViewDialog.vue";

const breadcrumb = [{ title: "Queue", disabled: false }];

const headers = [
  { title: "Index", key: "index", sortable: false },
  { title: "Name", key: "name", sortable: false },
  { title: "Created At", key: "createdAt", sortable: false },
  { title: "", key: "actions", sortable: false, align: "end" as const },
];

const { items, loading, refresh, deleteItem } = useItems();

type Item = UnwrapRef<typeof items>[number];

const showViewDialog = ref(false);
const item = ref<Item | null>(null);

function onClickRow(event: Event, value: { item: Item }) {
  showViewDialog.value = true;
  item.value = value.item;
  console.log("onClickRow", value);
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
