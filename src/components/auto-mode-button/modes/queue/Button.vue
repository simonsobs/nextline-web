<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="tonal" color="tertiary"> Auto Mode: Queue </v-btn>
    </template>
    <dialog-on></dialog-on>
  </v-menu>
</template>

<script setup lang="ts">
import DialogOn from "./Dialog.vue";
</script>
