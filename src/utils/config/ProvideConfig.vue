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
import { ref, watchEffect, nextTick } from "vue";
import type { ComputedRef } from "vue";
import { useLoadConfig } from "@/utils/config";
import { useProvideConfig, Config } from "@/utils/config";

const error = ref<Error>();

const { error: loadError, config } = await useLoadConfig();
watchEffect(() => {
  error.value = loadError.value;
});

if (!config.value) throw new Error("Config is null");
useProvideConfig(config as ComputedRef<Config>);

// For test reactivity of loading.
// await new Promise((resolve) => setTimeout(resolve, 1000));

// For test reactivity of error.
// error.value = new Error("Test");
// nextTick(async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   error.value = undefined;
// });
</script>
