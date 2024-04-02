<template>
  <v-card-actions>
    <button-off v-if="autoMode === 'off'"></button-off>
    <button-on v-else-if="autoMode === 'scheduler'"></button-on>
    <button-error v-else></button-error>
  </v-card-actions>
</template>

<script setup lang="ts">
import ButtonError from "./modes/error/Button.vue";
import ButtonOn from "./modes/on/Button.vue";
import ButtonOff from "./modes/off/Button.vue";
import { useSubscribeScheduleAutoMode } from "@/api";
const { autoMode } = await useSubscribeScheduleAutoMode();
</script>
