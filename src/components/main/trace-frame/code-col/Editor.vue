<template>
  <div ref="refEditor" style="height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { PromptingData } from "@/graphql/codegen/generated";

import {
  useMonacoEditor,
  useScroll,
  useMarkCurrentLine,
} from "./monaco-editor";

interface Props {
  state: PromptingData;
  source: string;
}

const props = defineProps<Props>();

const { state, source } = toRefs(props);

const refEditor = ref<HTMLElement>();

const { editor } = useMonacoEditor(refEditor, source);

const lineNo = computed(() => state.value.lineNo);
const prompting = computed(() => state.value.prompting);

const className = computed(() =>
  prompting.value ? "background-high" : "background-low"
);
const glyphMarginClassName = computed(() =>
  prompting.value ? "arrow-high" : "arrow-low"
);

useScroll(editor, lineNo);
useMarkCurrentLine(editor, lineNo, className, glyphMarginClassName);
</script>

<style scoped>
:deep(.monaco-editor .cursors-layer > .cursor) {
  display: none !important;
}
:deep(.monaco-editor .background-high) {
  background: rgb(var(--v-theme-surface-variant));
}
:deep(.monaco-editor .background-low) {
  background: rgb(var(--v-theme-surface-container-highest));
}
:deep(.monaco-editor .arrow-high::before) {
  color: rgb(var(--v-theme-primary));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
:deep(.monaco-editor .arrow-low::before) {
  color: rgb(var(--v-theme-surface-container-highest));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
</style>
