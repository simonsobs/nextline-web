<template>
  <div class="queue-frame">
    <div class="g-container">
      <div class="g-breadcrumb">
        <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      </div>
      <div class="g-top">
        <top-frame> </top-frame>
      </div>
      <div class="g-table">
        <table-frame v-model:show-add-dialog="showAddDialog"> </table-frame>
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
    <add-dialog v-model="showAddDialog"> </add-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TopFrame from "./TopFrame.vue";
import TableFrame from "./TableFrame.vue";
import AddDialog from "./add/AddDialog.vue";
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
