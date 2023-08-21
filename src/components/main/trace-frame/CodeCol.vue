<template>
  <div class="code-col" ref="refEditor"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick, toRef } from "vue";
import * as monaco from "monaco-editor";

import { useDarkMode } from "@/utils/color-theme";
import { PromptingData, useSourceQuery } from "@/graphql/codegen/generated";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();

const { isDark } = useDarkMode();

const state = toRef(props, "state");

const refEditor = ref<HTMLElement | null>(null);

const model = monaco.editor.createModel("", "python");

let editor: monaco.editor.IStandaloneCodeEditor | undefined;

onMounted(() => {
  if (!refEditor.value) return;
  editor = monaco.editor.create(refEditor.value, {
    model,
    minimap: { enabled: false },
    scrollbar: { vertical: "auto", horizontal: "auto" },
    fontFamily: "Fira Code",
    fontSize: 14,
    fontWeight: "500",
    fontLigatures: true,
    lineHeight: 24,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    glyphMargin: true,
    readOnly: true,
    matchBrackets: "never",
    selectionHighlight: false,
    occurrencesHighlight: false,
    renderLineHighlight: "none",
    theme: isDark.value ? "nextline-viewer-dark" : "nextline-viewer-light",
  });
});

watch(
  isDark,
  (val) => {
    monaco.editor.setTheme(
      val ? "nextline-viewer-dark" : "nextline-viewer-light"
    );
  },
  { immediate: true }
);

let decorationsCollection:
  | monaco.editor.IEditorDecorationsCollection
  | undefined;

function markCurrentLine() {
  if (!editor) return;
  const { lineNo, prompting } = state.value;
  if (!(lineNo >= 1)) return;
  decorationsCollection?.clear();
  decorationsCollection = editor.createDecorationsCollection([
    {
      range: new monaco.Range(lineNo, 1, lineNo, 1),
      options: {
        isWholeLine: true,
        className: prompting ? "currentLineContent" : "currentLineContentDim",
        glyphMarginClassName: prompting
          ? "currentLineMargin"
          : "currentLineMarginDim",
      },
    },
  ]);
}

function scroll() {
  if (!editor) return;
  const lineNo = state.value.lineNo;
  if (!(lineNo >= 1)) return;
  editor.revealLineInCenter(lineNo);
}

const fileName = computed(() => state.value.fileName);

// @ts-ignore
const query = useSourceQuery({ variables: { fileName } });

const sourceLines = computed(() => query.data.value?.source || []);
const source = computed(() => sourceLines.value.join("\n"));

watch(
  source,
  (val) => {
    model.setValue(source.value);
    nextTick(scroll);
    nextTick(markCurrentLine);
  },
  { immediate: true }
);

watch(
  state,
  (val) => {
    nextTick(scroll);
    nextTick(markCurrentLine);
  },
  { immediate: true }
);
</script>

<style>
.code-col {
  height: 100%;
  max-height: 100%;
}
.code-col .monaco-editor .cursors-layer > .cursor {
  display: none !important;
}
.code-col .monaco-editor .currentLineContent {
  background: var(--v-primary-lighten4);
}
.code-col .monaco-editor .currentLineContentDim {
  background: var(--v-background-lighten3);
}
.code-col .monaco-editor .currentLineMargin::before {
  color: var(--v-primary-base);
  content: "⮕";
  font-size: 24px;
}
.code-col .monaco-editor .currentLineMarginDim::before {
  color: #b0bec5;
  content: "⮕";
  font-size: 24px;
}
</style>
