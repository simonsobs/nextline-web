<template>
  <VCardActions>
    <ButtonOff v-if="mode === 'off'"></ButtonOff>
    <ButtonScheduler v-else-if="mode === 'scheduler'"></ButtonScheduler>
    <ButtonQueue v-else-if="mode === 'queue'"></ButtonQueue>
    <ButtonError v-else></ButtonError>
  </VCardActions>
</template>

<script setup lang="ts">
import { useSubscribeScheduleAutoModeMode } from "@/api";

import ButtonError from "./modes/error/Button.vue";
import ButtonOff from "./modes/off/Button.vue";
import ButtonQueue from "./modes/queue/Button.vue";
import ButtonScheduler from "./modes/scheduler/Button.vue";
const { data: mode } = await useSubscribeScheduleAutoModeMode();
</script>
