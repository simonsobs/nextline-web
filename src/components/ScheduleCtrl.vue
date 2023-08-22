<template>
  <v-card-actions>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Auto Mode: {{ label }} </v-btn>
      </template>
      <dialog-auto-mode> </dialog-auto-mode>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScheduleStore } from "@/plugins/pinia/stores/schedule";
import DialogAutoMode from "@/components/DialogAutoMode.vue";

const scheduleStore = useScheduleStore();

const label = computed(() => {
  const s = scheduleStore.autoMode;
  if (s === false) return "Off";
  if (s === true) return "On";
  return "Unknown";
});
</script>
