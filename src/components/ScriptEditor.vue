<template>
  <v-card flat height="100%" class="grey lighten-4">
    <v-system-bar color="primary" dark>
      <v-icon> mdi-language-python </v-icon>
      <span>&lt;string&gt;</span>
    </v-system-bar>
    <div class="g-container">
      <v-card-actions class="flex-row flex-wrap pa-1 grey lighten-4">
        <v-tooltip bottom open-delay="500" v-for="(b, i) in buttons" :key="i">
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
      <v-divider></v-divider>
      <div style="height: 100%">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
    </div>
  </v-card>
</template>

<script>
import * as monaco from "monaco-editor";

import RESET from "@/graphql/mutations/Reset.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

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
      fontFamily: "Fira Code",
      fontSize: "14px",
      fontWeight: 500, 
      fontLigatures: true,
      lineHeight: "24px",
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: "nextline",
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

<style scoped>
.g-container {
  display: grid;
  height: calc(100% - 24px); /* 24px: system bar */
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(0, 1fr);
}
</style>
