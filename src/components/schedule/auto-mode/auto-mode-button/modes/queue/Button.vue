<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn v-bind="props" variant="tonal" color="tertiary"> Auto Mode: Queue </VBtn>
    </template>
    <DialogOn></DialogOn>
  </VMenu>
</template>

<script setup lang="ts">
import DialogOn from "./Dialog.vue";
</script>
