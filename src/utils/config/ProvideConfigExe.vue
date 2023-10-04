<template>
  <slot></slot>
</template>

<script setup lang="ts">
/**
 * Load config asynchronously and provide it to the child components.
 */
import type { ComputedRef } from "vue";
import { useLoadConfig } from "@/utils/config";
import { useProvideConfig, Config } from "@/utils/config";
const { error, config } = await useLoadConfig();
if (error.value) throw error.value;
if (!config.value) throw new Error("Config is null");
useProvideConfig(config as ComputedRef<Config>);
// await new Promise((resolve) => setTimeout(resolve, 1000));
// throw new Error("Test");
</script>
