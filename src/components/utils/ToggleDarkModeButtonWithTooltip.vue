<template>
  <v-tooltip location="top end">
    <template #activator="{ props }">
      <toggle-button v-bind="props"></toggle-button>
    </template>
    <span>Toggle dark mode</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import toggleButton from "./ToggleDarkModeButton.vue";
</script>
