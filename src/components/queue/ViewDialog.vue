<template>
  <v-dialog v-model="show" persistent max-width="xl">
    <v-card>
      <v-card-title>View Item</v-card-title>
      <v-card-text> 
        <span class="font-weight-bold">Name:</span> {{ item?.name }}
        <br />
        <span class="font-weight-bold">Created at:</span> {{ item?.createdAt }}
      </v-card-text>
      <v-card-text>
        <pre>{{ item?.script }}</pre>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="item = null">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, watchEffect } from "vue";

import type { Item } from "./items";

const item = defineModel<Item | null>();
const show = ref(false);
watchEffect(() => {
  show.value = !!item.value;
});
</script>
