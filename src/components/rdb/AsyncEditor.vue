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
import { toRefs } from "vue";

import Editor from "./Editor.vue";
interface Props {
  source: string;
}
const props = defineProps<Props>();
const { source } = toRefs(props);
</script>
