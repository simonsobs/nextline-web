<template>
  <v-card outlined flat height="100%">
    <v-container fluid fill-height py-0>
      <v-row dense class="fill-height flex-column flex-nowrap justify-start">
        <v-col class="flex-grow-0 pa-0">
          <v-card-text class="pa-1"> &lt;string&gt; </v-card-text>
        </v-col>
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
        <v-col v-if="editing" id="col-textarea" class="overflow-hidden">
          <v-textarea
            v-model="source"
            id="script-editor-textarea"
            no-resize
            solo
            auto-grow
            class="v-card__text fill-height overflow-y-auto"
          >
          </v-textarea>
        </v-col>
        <v-col v-else class="overflow-hidden pa-0">
          <v-card flat height="100%" class="overflow-y-auto">
            <v-card-text>
              <v-container fluid fill-height ma-0 pa-0>
                <v-row class="flex-nowrap">
                  <div class="mr-3" style="min-width: 1em">
                    <pre><code><span
                            v-for="i in savedSourceLines.length"
                            :key="i"
                            ><span>{{ i }}</span>{{ '\n' }}</span></code></pre>
                  </div>
                  <div class="mr-3" style="min-width: 2em"></div>
                  <div>
                    <vue-code-highlight language="python">{{
                      savedSource
                    }}</vue-code-highlight>
                  </div>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";
import "@/prism.css";

import RESET from "@/graphql/mutations/Reset.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "ScriptViewer",
  components: {
    VueCodeHighlight,
  },
  data: () => ({
    editing: false,
    savedSourceLines: [],
    source: "",
  }),
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
    buttons() {
      if (!this.editing) {
        return [{ text: "Edit", method: "edit", icon: "mdi-pencil" }];
      } else {
        return [
          {
            text: "Save",
            method: "save",
            disabled: this.source == this.savedSource,
            icon: "mdi-content-save",
          },
          {
            text: "Reset",
            method: "reset",
            disabled: false,
            icon: "mdi-reload",
          },
          {
            text: "Close",
            method: "close",
            disabled: false,
            icon: "mdi-close",
          },
        ];
      }
    },
  },
  watch: {
    savedSource() {
      this.source = this.savedSource;
    },
    editing() {
      this.$emit("input", this.editing);
    },
  },
  methods: {
    onClick(method) {
      this[method]();
    },
    edit() {
      this.editing = true;
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
      this.source = this.savedSource;
    },
    close() {
      this.editing = false;
    },
  },
};
</script>

<style>
#script-editor-textarea {
  font-family: monospace;
  font-size: 14px;
  margin: 10px 0;
}

#col-textarea .v-text-field__details {
  display: none;
}

#col-textarea .v-input__slot {
  margin: 0;
  box-shadow: none;
}

</style>
