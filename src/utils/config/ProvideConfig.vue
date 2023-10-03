<template>
  <v-progress-linear v-if="loading" indeterminate> </v-progress-linear>
  <div v-else-if="error">
    <v-alert variant="tonal" type="error" class="ma-2">
      {{ error }}
    </v-alert>
  </div>
  <provide-config-exe v-else-if="config" :config="config">
    <slot></slot>
  </provide-config-exe>
</template>

<script setup lang="ts">
/**
 * Render the slot after loading the config and providing it to the slot.
 */
import { useLoadConfig, useOverride } from "@/utils/config";
import ProvideConfigExe from "./ProvideConfigExe.vue";
const loadConfig = useLoadConfig();
const { override, loading, error, config } = useOverride(loadConfig);
// override.value.loading = true;
// override.value.error = true;
</script>
