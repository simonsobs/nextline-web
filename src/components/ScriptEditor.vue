<template>
  <v-card outlined flat height="100%" class="grey lighten-5">
    <v-system-bar class="primary on-primary--text">
      <v-icon class="primary on-primary--text"> mdi-language-python </v-icon>
      <span>&lt;string&gt;</span>
    </v-system-bar>
    <!-- <v-container fluid fill-height py-0> -->
    <v-container fluid class="pb-0" style="height: calc(100% - 24px)">
      <v-row class="fill-height flex-column flex-nowrap justify-start">
        <v-divider></v-divider>
        <v-col class="flex-grow-0 pa-0">
          <v-card-actions class="flex-row flex-wrap pa-1">
            <v-tooltip
              bottom
              open-delay="500"
              v-for="(b, i) in buttons"
              :key="i"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  icon
                  outlined
                  @click="onClick(b.method)"
                  :disabled="b.disabled"
                  v-bind="attrs"
                  v-on="on"
                  class="ma-1"
                >
                  <v-icon>{{ b.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ b.text }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-col>
        <v-divider></v-divider>
        <v-col class="pa-0" style="height: calc(100% - 44px)">
          <div
            ref="editor"
            style="height: 100%; max-height: 100%"
          ></div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import * as monaco from "monaco-editor";

import RESET from "@/graphql/mutations/Reset.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

// https://github.com/microsoft/monaco-editor/issues/1762
// https://github.com/microsoft/monaco-editor/blob/main/src/basic-languages/python/python.ts

monaco.editor.defineTheme("nextline", {
  base: "vs",
  inherit: true,
  rules: [{ token: "keyword", foreground: "#0077aa" }],
  colors: {
    "editor.foreground": "#000000CC",
    "editor.background": "#FAFAFA",
    "editorCursor.foreground": "#8B0000",
    "editor.lineHighlightBackground": "#8F8F8F20",
    "editorLineNumber.foreground": "#9E9E9E",
    "editor.selectionBackground": "#88000030",
    "editor.inactiveSelectionBackground": "#88000015",
  },
});
monaco.editor.setTheme("nextline");

export default {
  name: "ScriptEditor",
  props: {
    value: Boolean,
  },
  data() {
    const model = monaco.editor.createModel("", "python");
    model.onDidChangeContent(this.onDidChangeContent);
    return {
      savedSourceLines: [],
      source: "",
      model,
    };
  },
  apollo: {
    savedSourceLines: {
      query: QUERY_SOURCE,
      update(data) {
        return data.source;
      },
    },
  },
  computed: {
    savedSource() {
      return this.savedSourceLines.join("\n");
    },
    editing() {
      return this.source != this.savedSource;
    },
    buttons() {
      return [
        {
          text: "Save",
          method: "save",
          disabled: !this.editing,
          icon: "mdi-content-save",
        },
        {
          text: "Reset",
          method: "reset",
          disabled: !this.editing,
          icon: "mdi-reload",
        },
      ];
    },
  },
  watch: {
    savedSource() {
      this.source = this.savedSource;
      this.model.setValue(this.savedSource);
    },
    editing() {
      this.$emit("input", this.editing);
    },
  },
  async mounted() {
    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      model: this.model,
      minimap: { enabled: false },
      scrollbar: { vertical: "auto", horizontal: "auto" },
      fontFamily: "monospace",
      fontSize: "14px",
      lineHeight: "24px",
      automaticLayout: true,
      scrollBeyondLastLine: false
    });
  },
  methods: {
    onClick(method) {
      this[method]();
    },
    async save() {
      const data = await this.$apollo.mutate({
        mutation: RESET,
        variables: { statement: this.source },
      });
      await this.$apollo.queries.savedSourceLines.refetch();
    },
    async reset() {
      await this.$apollo.queries.savedSourceLines.refetch();
      this.model.setValue(this.savedSource);
      this.source = this.savedSource;
    },
    close() {
      this.editing = false;
    },
    onDidChangeContent(e) {
      this.source = this.model.getValue();
    },
  },
};
</script>
