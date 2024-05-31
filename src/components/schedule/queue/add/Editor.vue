<template>
  <div ref="element" style="height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useMonacoEditor } from "@/utils/monaco-editor";

// interface Props {
//   source: string;
// }
// const props = defineProps<Props>();
// const { source } = toRefs(props);
const source = defineModel<string>({ required: true });
const element = ref<HTMLElement>();
useMonacoEditor({ element, source, mode: "editor" });
</script>
