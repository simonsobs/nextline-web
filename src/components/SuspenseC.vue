<template>
  <div v-if="error">
    <slot name="error" :error="error">
      {{ error }}
    </slot>
  </div>
  <suspense v-else v-bind="$attrs">
    <slot></slot>
    <template #fallback>
      <slot name="fallback"> Loading... </slot>
    </template>
  </suspense>
</template>

<script setup lang="ts">
/**
 * Custom Suspense component that allows for error handling.
 * https://vuejs.org/guide/built-ins/suspense.html#error-handling
 */
import { ref, onErrorCaptured } from "vue";

defineOptions({
  inheritAttrs: false,
});

const error = ref<Error>();

onErrorCaptured((e, instance, info) => {
  console.error(e, instance, info);
  error.value = e;
  return false;
});
</script>
