<template>
  <div class="queue-frame">
    <div class="g-container">
      <div class="g-breadcrumb">
        <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      </div>
      <div class="g-top pa-4 font-weight-light">
        <p>
          Python scripts in the queue are executed in the order when the auto mode is
          <span class="font-italic"> Queue. </span>
          <span v-if="!mobile">
            The items in the queue are not stored in the database but in the memory of
            the backend server. If the server is restarted, the queue will be empty.
          </span>
        </p>
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
          <template #no-data>
            <div
              class="text-left font-weight-light"
              style="max-width: 480px; margin: auto"
            >
              <p class="text-center font-weight-regular">The queue is empty.</p>
              <p class="font-weight-light mt-1">
                The auto mode will be turned off if a script is tried to be pulled when
                the queue is empty.
                <a
                  @click="showAddDialog = true"
                  class="text-decoration-underline cursor-pointer"
                >
                  Add the first item.
                </a>
              </p>
            </div>
          </template>
          <template #item.index="{ index }">
            <span class="text-primary font-weight-medium"> {{ index + 1 }} </span>
          </template>
          <template #item.script="{ item }">
            <div class="item-script">
              {{ item.script }}
            </div>
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
      @click="showAddDialog = true"
    >
    </v-btn>
    <view-dialog v-model="showViewDialog" :item="viewItem" v-if="viewItem">
    </view-dialog>
    <add-dialog v-model="showAddDialog"> </add-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { useItems } from "./items";
import type { Item } from "./items";

import ViewDialog from "./view/ViewDialog.vue";
import AddDialog from "./add/AddDialog.vue";

const { mobile } = useDisplay();

const breadcrumb = [{ title: "Queue", disabled: false }];

const headersMobile = [
  { title: "Name", key: "name", sortable: false },
  { title: "Created At", key: "createdAt", sortable: false },
];

const headersNotMobile = [
  { title: "Order", key: "index", sortable: false },
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

const showAddDialog = ref(false);
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
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas: "breadcrumb" "top" "table";
}

.g-breadcrumb {
  grid-area: breadcrumb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-top {
  grid-area: top;
}

.g-table {
  grid-area: table;
}

.item-script {
  max-inline-size: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(var(--v-theme-on-surface-variant));
}
</style>
