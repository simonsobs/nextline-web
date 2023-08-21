<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading"></div>
  <provide-config v-else-if="config" :config="config">
    <app> </app>
  </provide-config>
</template>

<script setup lang="ts">
/**
 * Render the main app after the config is loaded.
 */
import { useLoadConfig } from "@/utils/config";
import ProvideConfig from "./ProvideConfig.vue";
import App from "./AppWLoadConfig.vue";
const { config, loading, error } = useLoadConfig();
</script>
