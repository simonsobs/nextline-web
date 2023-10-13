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
      <dialog-auto-mode> </dialog-auto-mode>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import DialogAutoMode from "@/components/DialogAutoMode.vue";
import { useSubscribeScheduleAutoMode } from "@/api";
const subscription = useSubscribeScheduleAutoMode();
const { autoMode } = subscription;
await subscription;
</script>
