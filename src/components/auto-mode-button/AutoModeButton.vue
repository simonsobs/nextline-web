<template>
  <v-card-actions>
    <v-menu v-if="autoMode === undefined">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="tonal" color="error"> Auto Mode: Unknown </v-btn>
      </template>
        <dialog-error></dialog-error>
    </v-menu>
    <v-menu v-else-if="autoMode">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="tonal" color="tertiary"> Auto Mode: On </v-btn>
      </template>
        <dialog-on></dialog-on>
    </v-menu>
    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Auto Mode: Off </v-btn>
      </template>
      <dialog-off></dialog-off>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import DialogError from "./DialogError.vue";
import DialogOn from "./DialogOn.vue";
import DialogOff from "./DialogOff.vue";
import { useSubscribeScheduleAutoMode } from "@/api";
const subscription = useSubscribeScheduleAutoMode();
const { autoMode } = subscription;
await subscription;
</script>
