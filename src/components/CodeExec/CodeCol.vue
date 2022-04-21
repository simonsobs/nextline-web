<template>
  <div class="code-col" ref="editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";

import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "CodeCol",
  props: {
    state: Object,
  },
  data() {
    const model = monaco.editor.createModel("", "python");
    return {
      sourceLines: [],
      editor: null,
      model,
      decorationsCurrentLine: [],
    };
  },
  computed: {
    source() {
      return this.sourceLines.join("\n");
    },
  },
  apollo: {
    sourceLines: {
      query: QUERY_SOURCE,
      variables() {
        return {
          fileName: this.state.fileName,
        };
      },
      skip() {
        return !this.state;
      },
      update(data) {
        return data.source;
      },
      result() {
        this.$nextTick(this.scroll);
        this.$nextTick(this.markCurrentLine);
      },
    },
  },
  watch: {
    source() {
      this.model.setValue(this.source);
    },
    state: {
      handler() {
        this.$nextTick(this.scroll);
        this.$nextTick(this.markCurrentLine);
      },
      immediate: true,
    },
  },
  async mounted() {
    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      model: this.model,
      minimap: { enabled: false },
      scrollbar: { vertical: "auto", horizontal: "auto" },
      fontFamily: "Fira Code",
      fontSize: "14px",
      fontWeight: 500, 
      fontLigatures: true,
      lineHeight: "24px",
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
    // this.$nextTick(this.markCurrentLine);
  },
  methods: {
    markCurrentLine() {
      if (!this.editor) return;
      const { lineNo, prompting } = this.state;
      if (!(lineNo >= 1)) return;
      this.decorationsCurrentLine = this.editor.deltaDecorations(
        this.decorationsCurrentLine,
        [
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
        ]
      );
    },
    scroll() {
      if (!this.editor) return;
      const lineNo = this.state.lineNo;
      if (!(lineNo >= 1)) return;
      this.editor.revealLineInCenter(lineNo);
    },
  },
};
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
  background:  var(--v-primary-lighten4);
}
.code-col .monaco-editor .currentLineContentDim {
  background:  var(--v-background-lighten3);
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
