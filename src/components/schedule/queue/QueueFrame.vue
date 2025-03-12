<template>
  <div class="queue-frame">
    <div class="g-container">
      <div class="g-breadcrumb">
        <VBreadcrumbs :items="breadcrumb"> </VBreadcrumbs>
      </div>
      <div class="g-top">
        <TopFrame> </TopFrame>
      </div>
      <div class="g-table">
        <TableFrame v-model:show-add-dialog="showAddDialog"> </TableFrame>
      </div>
    </div>
    <VBtn
      variant="flat"
      size="x-large"
      color="primary-fixed"
      elevation="2"
      icon="mdi-plus-thick"
      class="fab"
      @click="showAddDialog = true"
    >
    </VBtn>
    <AddDialog v-model="showAddDialog"> </AddDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AddDialog from "./add/AddDialog.vue";
import TableFrame from "./TableFrame.vue";
import TopFrame from "./TopFrame.vue";
const breadcrumb = [{ title: "Queue", disabled: false }];
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
</style>
