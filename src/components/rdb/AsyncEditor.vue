<template>
  <Suspense>
    <editor :source="source"> </editor>
    <template #fallback>
      <div style="height: 100%">
        <VProgressLinear indeterminate></VProgressLinear>
        <!-- <pre class="overflow-auto" style="height: 100%">{{ source }}</pre> -->
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { toRefs, defineAsyncComponent } from "vue";

const Editor = defineAsyncComponent(() => import("./Editor.vue"));

// Add artificial delay for testing
// const Editor = defineAsyncComponent(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(import("./Editor.vue"));
//       }, 2000); // 2 second delay
//     })
// );

interface Props {
  source: string;
}
const props = defineProps<Props>();
const { source } = toRefs(props);
</script>
