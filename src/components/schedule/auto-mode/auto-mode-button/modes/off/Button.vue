<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn v-bind="props"> Auto Mode: Off </VBtn>
    </template>
    <DialogOff></DialogOff>
  </VMenu>
</template>

<script setup lang="ts">
import DialogOff from "./Dialog.vue";
</script>
