<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    @click-:row="showViewDialog = true"
    @click:row="onClickRow"
  >
    <template #no-data>
      <div class="text-left font-weight-light" style="max-width: 480px; margin: auto">
        <p class="text-center font-weight-regular">The queue is empty.</p>
        <p class="font-weight-light mt-1">
          The auto mode will be turned off if a script is tried to be pulled when the
          queue is empty.
          <a
            @click="showAddDialog = true"
            class="text-decoration-underline cursor-pointer"
          >
            Add the first item.
          </a>
        </p>
      </div>
    </template>
    <template #item.order="{ item }">
      <span class="text-primary font-weight-medium"> {{ item.order }} </span>
    </template>
    <template #item.script="{ item }">
      <div class="item-script">
        {{ item.script }}
      </div>
    </template>
    <template #bottom></template>
  </v-data-table>
  <view-dialog v-model="showViewDialog" :item="viewItem" v-if="viewItem"> </view-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useDisplay } from "vuetify";
import { useItems } from "./items";
import type { Item } from "./items";

import ViewDialog from "./view/ViewDialog.vue";

const showAddDialog = defineModel<boolean>("showAddDialog");

const { mobile } = useDisplay();

const headersMobile = [
  { title: "Name", key: "name", sortable: false },
  { title: "Created At", key: "createdAt", sortable: false },
];

const headersNotMobile = [
  { title: "Order", key: "order", sortable: false },
  { title: "Name", key: "name", sortable: false },
  { title: "Created at", key: "createdAt", sortable: false },
  { title: "Python script", key: "script", sortable: false },
];

const headers = computed(() => (mobile.value ? headersMobile : headersNotMobile));

const { items, loading } = useItems();

const showViewDialog = ref(false);
const viewItem = ref<Item>();

function onClickRow(event: Event, value: { item: Item }) {
  showViewDialog.value = true;
  viewItem.value = value.item;
}

const viewItemInItems = computed(() => {
  const id = viewItem.value?.id;
  return id ? items.value?.some((item) => item.id === id) : false;
});

// Close the view dialog if the item is no longer in the queue.
// TODO: Show a notification after closing the dialog.
watchEffect(() => {
  if (!viewItemInItems.value) {
    showViewDialog.value = false;
  }
});
</script>

<style scoped>
.item-script {
  max-inline-size: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(var(--v-theme-on-surface-variant));
}
</style>
