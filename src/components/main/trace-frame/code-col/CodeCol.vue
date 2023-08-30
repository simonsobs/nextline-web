<template>
  <div class="code-col" ref="refEditor"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, toRefs, toValue } from "vue";

import { PromptingData } from "@/graphql/codegen/generated";

import { useMonacoEditor } from "./monaco-editor";
import { useSource } from "./source";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();

const { state } = toRefs(props);

const refEditor = ref<HTMLElement>();

const fileName = computed(() => state.value.fileName);
const { source } = useSource(fileName);

const { model, markCurrentLine, scroll } = useMonacoEditor(refEditor, source);

function onUpdated() {
  const st = toValue(state);
  const { lineNo, prompting } = st;
  scroll(lineNo);
  const className = prompting ? "currentLineContent" : "currentLineContentDim";
  const glyphMarginClassName = prompting
    ? "currentLineMargin"
    : "currentLineMarginDim";
  markCurrentLine(lineNo, className, glyphMarginClassName);
}

watch(
  source,
  (val) => {
    if (source.value === undefined) return;
    model.setValue(source.value);
    nextTick(() => {
      onUpdated();
    });
  },
  { immediate: true }
);

watch(
  state,
  (val) => {
    if (source.value === undefined) return;
    nextTick(() => {
      onUpdated();
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.code-col {
  height: 100%;
  max-height: 100%;
}
.code-col:deep(.monaco-editor .cursors-layer > .cursor) {
  display: none !important;
}
.code-col:deep(.monaco-editor .currentLineContent) {
  background: rgb(var(--v-theme-surface-variant));
}
.code-col:deep(.monaco-editor .currentLineContentDim) {
  background: rgb(var(--v-theme-surface-container-highest));
}
.code-col:deep(.monaco-editor .currentLineMargin::before) {
  color: rgb(var(--v-theme-primary));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
.code-col:deep(.monaco-editor .currentLineMarginDim::before) {
  color: rgb(var(--v-theme-surface-container-highest));
  content: "⮕";
  font-family: "Noto Sans JP", sans-serif;
  font-size: 24px;
}
</style>
