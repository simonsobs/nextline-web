<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> Auto Mode: Off </v-btn>
    </template>
    <dialog-off></dialog-off>
  </v-menu>
</template>

<script setup lang="ts">
import DialogOff from "./Dialog.vue";
</script>
