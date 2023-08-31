<template>
  <div ref="refEditor" style="height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, toRefs, toValue } from "vue";

import { PromptingData } from "@/graphql/codegen/generated";

import { useMonacoEditor, useScroll, useMarkCurrentLine } from "./monaco-editor";
import { useSource } from "./source";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();

const { state } = toRefs(props);

const refEditor = ref<HTMLElement>();

const fileName = computed(() => state.value.fileName);
const { source } = useSource(fileName);

const { editor, model } = useMonacoEditor(refEditor, source);
const { scroll } = useScroll(editor);
const { markCurrentLine } = useMarkCurrentLine(editor);

const lineNo = computed(() => state.value.lineNo);
const prompting = computed(() => state.value.prompting);

const className = computed(() =>
  prompting.value ? "currentLineContent" : "currentLineContentDim"
);
const glyphMarginClassName = computed(() =>
  prompting.value ? "currentLineMargin" : "currentLineMarginDim"
);

function onUpdated() {
  scroll(lineNo.value);
  markCurrentLine(lineNo.value, className.value, glyphMarginClassName.value);
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
