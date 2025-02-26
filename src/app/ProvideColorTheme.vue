<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useConfig } from "@/utils/config";
import { useColorTheme } from "@/utils/color-theme";

const { config } = useConfig();
const sourceColorHex = computed(() => config.value.seedColor);

useColorTheme(sourceColorHex);
</script>
