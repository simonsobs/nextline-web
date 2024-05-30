<template>
  <VMenu>
    <template v-slot:activator="{ props }">
      <VBtn v-bind="props" variant="tonal" color="error"> Auto Mode: Unknown </VBtn>
    </template>
    <DialogError></DialogError>
  </VMenu>
</template>

<script setup lang="ts">
import DialogError from "./Dialog.vue";
</script>
