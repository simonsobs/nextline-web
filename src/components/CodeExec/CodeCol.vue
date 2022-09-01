<template>
  <div class="code-col" ref="refEditor"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref,
  computed,
  watch,
  nextTick,
} from "vue";
import { useQuery } from "@urql/vue";
import * as monaco from "monaco-editor";

import QUERY_SOURCE from "@/graphql/queries/Source.gql";

interface PromptingData {
  prompting: number;
  fileName: string;
  lineNo: number;
  traceEvent: string;
}

export default defineComponent({
  name: "CodeCol",
  props: {
    state: { type: Object as PropType<PromptingData>, required: true },
  },
  setup(props) {
    const refEditor = ref<HTMLElement | null>(null);

    const model = monaco.editor.createModel("", "python");

    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

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
        theme: "nextline-viewer",
      });
    });

    let decorationsCurrentLine: string[] = [];

    function markCurrentLine() {
      if (!editor) return;
      const { lineNo, prompting } = props.state;
      if (!(lineNo >= 1)) return;
      decorationsCurrentLine = editor.deltaDecorations(decorationsCurrentLine, [
        {
          range: new monaco.Range(lineNo, 1, lineNo, 1),
          options: {
            isWholeLine: true,
            className: prompting
              ? "currentLineContent"
              : "currentLineContentDim",
            glyphMarginClassName: prompting
              ? "currentLineMargin"
              : "currentLineMarginDim",
          },
        },
      ]);
    }

    function scroll() {
      if (!editor) return;
      const lineNo = props.state.lineNo;
      if (!(lineNo >= 1)) return;
      editor.revealLineInCenter(lineNo);
    }

    const fileName = ref(props.state.fileName);

    watch(
      () => props.state.fileName,
      (val) => {
        fileName.value = val;
      }
    );

    const query = useQuery<{ source: string[] }>({
      query: QUERY_SOURCE,
      variables: {
        fileName,
      },
    });

    const sourceLines = ref<string[]>([]);

    watch(query.data, (data) => {
      if (!data?.source) return;
      sourceLines.value = data.source;
      nextTick(scroll);
      nextTick(markCurrentLine);
    });

    watch(
      () => props.state,
      () => {
        nextTick(scroll);
        nextTick(markCurrentLine);
      },
      { immediate: true }
    );

    const source = computed(() => {
      return sourceLines.value.join("\n");
    });

    watch(source, (val) => {
      model.setValue(val);
    });

    return {
      refEditor,
    };
  },
});
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
