<template>
  <div ref="refEditor" style="height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, toRefs, toValue } from "vue";
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

const { editor, model } = useMonacoEditor(refEditor, source);

const lineNo = computed(() => state.value.lineNo);
const prompting = computed(() => state.value.prompting);

const className = computed(() =>
  prompting.value ? "currentLineContent" : "currentLineContentDim"
);
const glyphMarginClassName = computed(() =>
  prompting.value ? "currentLineMargin" : "currentLineMarginDim"
);

useScroll(editor, lineNo);
useMarkCurrentLine(editor, lineNo, className, glyphMarginClassName);

watchEffect(() => {
  // This is unnecessary as the source doesn't change for a given instance.
  // When the source changes, a new instance is created.
  if (model.getValue() === toValue(source)) return;
  console.warn("The source has changed.");
  model.setValue(toValue(source));
});
</script>

<style scoped>
:deep(.monaco-editor .cursors-layer > .cursor) {
  display: none !important;
}
:deep(.monaco-editor .currentLineContent) {
  background: rgb(var(--v-theme-surface-variant));
}
:deep(.monaco-editor .currentLineContentDim) {
  background: rgb(var(--v-theme-surface-container-highest));
}
:deep(.monaco-editor .currentLineMargin::before) {
  color: rgb(var(--v-theme-primary));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
:deep(.monaco-editor .currentLineMarginDim::before) {
  color: rgb(var(--v-theme-surface-container-highest));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
</style>
