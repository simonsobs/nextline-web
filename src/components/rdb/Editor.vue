<template>
  <div ref="element" :style="{ height: editorHeight }"></div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";

import { useMonacoEditor } from "@/utils/monaco-editor";

interface Props {
  source: string;
}
const props = defineProps<Props>();
const { source } = toRefs(props);
const element = ref<HTMLElement>();

const nLines = computed(() => source.value.split("\n").length);
const lineHeight = 24; // From monaco-editor
const padding = 10; // TODO: Check if this is correct
const editorHeight = computed(() => {
  const height = nLines.value * lineHeight + padding;
  return `${height}px`;
});

// await new Promise((resolve) => setTimeout(resolve, 2000));
await useMonacoEditor({ element, source });
</script>
