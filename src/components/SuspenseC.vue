<template>
  <template v-if="error">
    <slot name="error" :error="error">
      {{ error }}
    </slot>
  </template>
  <Suspense v-else v-bind="props">
    <slot></slot>
    <template #fallback>
      <slot name="fallback"> Loading... </slot>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
/**
 * Custom Suspense component that allows for error handling.
 * It uses onErrorCaptured() as suggested in the Vue docs:
 * https://vuejs.org/guide/built-ins/suspense.html#error-handling
 *
 * Note: Because of v-else on Suspense, the slot component will be
 * deconstructed when an error is captured.
 */
import { ref, onErrorCaptured } from "vue";
import type { VNodeProps, SuspenseProps } from "vue";

defineOptions({ inheritAttrs: false });

// Note: InstanceType causes an error for unknown reasons.
// type Props = InstanceType<typeof Suspense>["$props"]
type Props = VNodeProps & SuspenseProps;

// Define props explicitly instead of using $attrs for TypeScript.
const props = defineProps<Props>();

const error = ref<Error>();

onErrorCaptured((e, instance, info) => {
  console.error(e, instance, info);
  error.value = e;
  return false; // false: stop propagation
});
</script>
