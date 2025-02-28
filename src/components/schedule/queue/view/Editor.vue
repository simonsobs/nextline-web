<template>
  <div ref="element" style="height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useMonacoEditor } from "@/utils/monaco-editor";

interface Props {
  source: string;
}
const props = defineProps<Props>();
const { source } = toRefs(props);
const element = ref<HTMLElement>();
await useMonacoEditor({ element, source });
</script>
