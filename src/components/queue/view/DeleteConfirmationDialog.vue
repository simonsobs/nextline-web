<template>
  <v-dialog v-model="show" max-width="400">
    <v-card class="pa-2">
      <v-card-title class="text-error"> Delete? </v-card-title>
      <v-card-text>
        <div><span class="font-weight-bold">Name:</span> {{ item?.name }}</div>
        <div>
          <span class="font-weight-bold">Created at:</span> {{ item?.createdAt }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" color="grey-darken-2" @click="show = false">
          cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="error" @click="onConfirm"> delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Item } from "../items";
interface Props {
  item: Item;
}
defineProps<Props>();
const show = defineModel<boolean>();
type Emits = {
  confirm: [];
};
const emit = defineEmits<Emits>();
function onConfirm() {
  emit("confirm");
  show.value = false;
}
</script>
