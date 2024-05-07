<template>
  <v-card-actions>
    <button-off v-if="mode === 'off'"></button-off>
    <button-scheduler v-else-if="mode === 'scheduler'"></button-scheduler>
    <button-queue v-else-if="mode === 'queue'"></button-queue>
    <button-error v-else></button-error>
  </v-card-actions>
</template>

<script setup lang="ts">
import ButtonError from "./modes/error/Button.vue";
import ButtonOff from "./modes/off/Button.vue";
import ButtonScheduler from "./modes/scheduler/Button.vue";
import ButtonQueue from "./modes/queue/Button.vue";
import { useSubscribeScheduleAutoModeMode } from "@/api";
const { autoModeMode: mode } = await useSubscribeScheduleAutoModeMode();
</script>
