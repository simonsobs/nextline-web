<template>
  <v-tooltip location="top end">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="text" icon @click="toggleDark()">
        <v-icon v-if="isDark" icon="mdi-weather-night"></v-icon>
        <v-icon v-else icon="mdi-weather-sunny"></v-icon>
      </v-btn>
    </template>
    <span>Toggle dark mode</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/utils/color-theme";
const { isDark, toggleDark } = useDarkMode();
</script>
