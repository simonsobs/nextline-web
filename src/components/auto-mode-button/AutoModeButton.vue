<template>
  <v-card-actions>
    <button-error v-if="autoMode === undefined"></button-error>
    <button-on v-else-if="autoMode"></button-on>
    <button-off v-else></button-off>
  </v-card-actions>
</template>

<script setup lang="ts">
import ButtonError from "./modes/error/Button.vue";
import ButtonOn from "./modes/on/Button.vue";
import ButtonOff from "./modes/off/Button.vue";
import { useSubscribeScheduleAutoMode } from "@/api";
const { autoMode } = await useSubscribeScheduleAutoMode();
</script>
