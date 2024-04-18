<template>
  <v-dialog v-model="show" persistent max-width="xl">
    <item-view v-model="item"> </item-view>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, watchEffect } from "vue";

import ItemView from "./ItemView.vue";

import type { Item } from "./items";

const item = defineModel<Item | null>();
const show = ref(false);
watchEffect(() => {
  show.value = !!item.value;
});
</script>
