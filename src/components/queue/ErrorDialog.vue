<template>
  <v-dialog v-model="show" max-width="800">
    <v-card class="pa-2">
      <v-card-title class="text-error"> An error occurred</v-card-title>
      <v-card-text class="text-error"> <pre>{{ error }}</pre> </v-card-text>
      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-btn variant="text" color="primary" @click="onOk"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { CombinedError } from '@urql/vue';
const show = defineModel<boolean>();
interface Props {
  error?: CombinedError;
}
type Emits = {
  ok: [];
};
defineProps<Props>();
const emit = defineEmits<Emits>();
function onOk() {
  emit("ok");
  show.value = false;
}
</script>
