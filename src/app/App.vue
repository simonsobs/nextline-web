<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading"></div>
  <provide-config v-else-if="config" :config="config">
    <provide-urql-client>
      <app> </app>
    </provide-urql-client>
  </provide-config>
</template>

<script setup lang="ts">
/**
 * Render the main app after the config is loaded.
 */
import { useLoadConfig } from "@/utils/config";
import ProvideConfig from "./ProvideConfig.vue";
import ProvideUrqlClient from "./ProvideUrqlClient.vue";
import App from "./AppMain.vue";
const { config, loading, error } = useLoadConfig();
</script>
