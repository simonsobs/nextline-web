<template>
  <v-card-actions>
    <ButtonOff v-if="mode === 'off'"></ButtonOff>
    <ButtonScheduler v-else-if="mode === 'scheduler'"></ButtonScheduler>
    <ButtonQueue v-else-if="mode === 'queue'"></ButtonQueue>
    <ButtonError v-else></ButtonError>
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
