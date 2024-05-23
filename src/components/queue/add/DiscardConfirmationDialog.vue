<template>
  <v-dialog v-model="show" max-width="400">
    <v-card class="pa-2">
      <v-card-title class="text-primary"> Discard the change? </v-card-title>
      <v-card-actions class="mt-5">
        <v-btn variant="text" color="grey-darken-2" @click="show = false">
          back to edit
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="onConfirm"> discard </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
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
