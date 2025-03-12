<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { provideColorTheme } from "@/utils/color-theme";
import { useConfig } from "@/utils/config";

const { config } = useConfig();
const sourceColorHex = computed(() => config.value.seedColor);

provideColorTheme(sourceColorHex);
</script>
