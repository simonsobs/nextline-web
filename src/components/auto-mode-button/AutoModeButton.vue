<template>
  <v-card-actions>
    <button-off v-if="autoMode === 'off'"></button-off>
    <button-scheduler v-else-if="autoMode === 'scheduler'"></button-scheduler>
    <button-queue v-else-if="autoMode === 'queue'"></button-queue>
    <button-error v-else></button-error>
  </v-card-actions>
</template>

<script setup lang="ts">
import ButtonError from "./modes/error/Button.vue";
import ButtonOff from "./modes/off/Button.vue";
import ButtonScheduler from "./modes/scheduler/Button.vue";
import ButtonQueue from "./modes/queue/Button.vue";
import { useSubscribeScheduleAutoMode } from "@/api";
const { autoMode } = await useSubscribeScheduleAutoMode();
</script>
