<template>
  <template v-if="error">
    <div>
      <VAlert variant="tonal" type="error" class="ma-2">
        {{ error }}
      </VAlert>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
/**
 * Load config asynchronously and provide it to the child components.
 */
import { useLoadConfig } from "@/utils/config";
import { useProvideConfig } from "@/utils/config";
const { error, config } = await useLoadConfig();
useProvideConfig(config);
</script>
