<template>
  <div style="height: 100%">
    <div v-if="nextlineState == 'running'" class="g-container">
      <code-exec
        :traceId="traceId"
        v-for="traceId in traceIds"
        :key="traceId"
      ></code-exec>
    </div>
    <script-editor v-else v-model="editing"></script-editor>
  </div>
</template>


<script>
import * as monaco from "monaco-editor";

import CodeExec from "@/components/CodeExec/CodeExec.vue";
import ScriptEditor from "@/components/ScriptEditor.vue";

import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_TRACE_IDS from "@/graphql/subscriptions/TraceIds.gql";

(function () {
  // https://github.com/microsoft/monaco-editor/issues/1762
  // https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

  const rules = [{ token: "keyword", foreground: "#0077aa" }];
  const colors = {
    "editor.foreground": "#000000CC",
    "editor.background": "#FAFAFA",
    "editorCursor.foreground": "#8B0000",
    "editorLineNumber.foreground": "#9E9E9E",
    "editor.selectionBackground": "#88000030",
    "editor.inactiveSelectionBackground": "#88000015",
  };
  const colorsEditor = {
    ...colors,
    "editor.lineHighlightBackground": "#8F8F8F20",
    "editorLineNumber.activeForeground": "#00796b",
  };
  const colorsViewer = {
    ...colors,
    "editorLineNumber.activeForeground": "#9E9E9E",
  };

  monaco.editor.defineTheme("nextline", {
    base: "vs",
    inherit: true,
    rules,
    colors: colorsEditor,
  });

  monaco.editor.defineTheme("nextline-viewer", {
    base: "vs",
    inherit: true,
    rules,
    colors: colorsViewer,
  });
})();

export default {
  name: "LayoutScript",
  components: {
    CodeExec,
    ScriptEditor,
  },
  data() {
    return {
      editing: false,
      tab: null,
      nextlineState: null,
      traceIds: [],
    };
  },
  apollo: {
    $subscribe: {
      nextlineState: {
        query: SUBSCRIBE_STATE,
        result({ data }) {
          this.nextlineState = data.state;
        },
      },
      traceIds: {
        query: SUBSCRIBE_TRACE_IDS,
        result({ data }) {
          this.traceIds = data.traceIds;
        },
      },
    },
  },
  watch: {
    editing(val) {
      this.$store.dispatch("editing", val);
    },
  },
};
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
</style>
