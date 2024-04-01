<template>
  <v-card-actions>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="autoMode === undefined"
          v-bind="props"
          variant="tonal"
          color="error"
        >
          Auto Mode: Unknown
        </v-btn>
        <v-btn v-else-if="autoMode" v-bind="props" variant="tonal" color="tertiary">
          Auto Mode: On
        </v-btn>
        <v-btn v-else v-bind="props"> Auto Mode: Off </v-btn>
      </template>
      <dialog-error v-if="autoMode === undefined"></dialog-error>
      <dialog-on v-else-if="autoMode"></dialog-on>
      <dialog-off v-else></dialog-off>
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
