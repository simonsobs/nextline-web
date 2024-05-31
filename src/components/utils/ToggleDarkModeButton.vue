<template>
  <VBtn variant="text" icon @click="toggleDark()">
    <VIcon v-if="isDark" icon="mdi-weather-night"></VIcon>
    <VIcon v-else icon="mdi-weather-sunny"></VIcon>
  </VBtn>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/utils/color-theme";
const { isDark, toggleDark } = useDarkMode();
</script>
