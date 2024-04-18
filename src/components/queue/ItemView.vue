<template>
  <div class="item-view rounded-lg pa-4">
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn variant="text" size="small" icon="mdi-close" @click="item = null"></v-btn>
    </div>
    <div class="mt-2"><span class="font-weight-bold">Name:</span> {{ item?.name }}</div>
    <div><span class="font-weight-bold">Created at:</span> {{ item?.createdAt }}</div>
    <div>
      <pre>{{ item?.script }}</pre>
    </div>
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="item = null">Close</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import type { Item } from "./items";
const item = defineModel<Item | null>();
</script>

<style scoped>
.item-view {
  background: rgb(var(--v-theme-surface-container-low));
}
</style>
