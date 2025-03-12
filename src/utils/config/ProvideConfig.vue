<template>
  <template v-if="reloadError">
    <div>
      <VAlert variant="tonal" type="error" class="ma-2">
        {{ reloadError }}
      </VAlert>
    </div>
  </template>
  <template v-if="initialError">
    <div>
      <VAlert variant="tonal" type="error" class="ma-2">
        {{ initialError }}
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
import { ref, watchEffect } from "vue";

import { useLoadConfig, useProvideConfig } from "@/utils/config";
const initialError = ref<any>();
const reloadError = ref<Error | undefined>();
try {
  const { error, config } = await useLoadConfig();
  useProvideConfig(config);
  watchEffect(() => {
    if (error.value) console.error(error.value);
    reloadError.value = error.value;
  });
} catch (e: unknown) {
  console.error(e);
  initialError.value = e;
}
</script>
