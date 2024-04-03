<template>
  <v-btn variant="text" icon @click="toggleDark()">
    <v-icon v-if="isDark" icon="mdi-weather-night"></v-icon>
    <v-icon v-else icon="mdi-weather-sunny"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/utils/color-theme";
const { isDark, toggleDark } = useDarkMode();
</script>
