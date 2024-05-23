<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" variant="tonal" color="error"> Auto Mode: Unknown </v-btn>
    </template>
    <dialog-error></dialog-error>
  </v-menu>
</template>

<script setup lang="ts">
import DialogError from "./Dialog.vue";
</script>
