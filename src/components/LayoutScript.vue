<template>
  <div style="height: 100%">
    <template v-if="nextlineState == 'running'">
      <div v-if="layout == 'grid'" class="g-grid-container">
        <code-exec
          :traceId="traceId"
          v-for="traceId in traceIds"
          :key="traceId"
        ></code-exec>
      </div>
      <div v-else class="g-tab-container">
        <v-tabs show-arrows v-model="tab">
          <v-tab v-for="traceId in traceIds" :key="traceId">
            {{ traceId }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="fill-height">
          <v-tab-item
            v-for="traceId in traceIds"
            :key="traceId"
            class="fill-height"
          >
            <code-exec :traceId="traceId"></code-exec>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </template>
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
  };
  const colorsViewer = { ...colors };

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
  computed: {
    layout() {
      return this.$store.state.layout;
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
.g-grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
.g-tab-container {
  display: grid;
  height: 100%;
  grid-template-rows: min-content 1fr;
  row-gap: 3px;
}
</style>
