<template>
  <VBtn v-if="loading" loading variant="tonal" color="tertiary"> </VBtn>
  <ButtonError v-else-if="error" :error="error"></ButtonError>
  <ButtonAutoMode v-else-if="autoMode"></ButtonAutoMode>
  <ButtonOff v-else-if="autoMode === false"></ButtonOff>
  <VBtn v-else variant="tonal" color="error"> Unknown </VBtn>
</template>

<script setup lang="ts">
import { useAutoMode } from "./use-auto-mode";

import ButtonOff from "./modes/off/Button.vue";
import ButtonAutoMode from "./modes/auto-mode/Button.vue";
import ButtonError from "./modes/error/Button.vue";
const { autoMode, loading, error } = useAutoMode();
</script>
