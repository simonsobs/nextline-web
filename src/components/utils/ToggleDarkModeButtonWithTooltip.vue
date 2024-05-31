<template>
  <VTooltip location="top end">
    <template #activator="{ props }">
      <ToggleButton v-bind="props"></ToggleButton>
    </template>
    <span>Toggle dark mode</span>
  </VTooltip>
</template>

<script setup lang="ts">
import ToggleButton from "./ToggleDarkModeButton.vue";
</script>
