<template>
  <div>
    <v-card>
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="!ta.prompting"
          @click="pdbCommand(th.threadId, ta.taskId, 'next')"
          >Next</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!ta.prompting"
          @click="pdbCommand(th.threadId, ta.taskId, 'continue')"
          >Continue</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!ta.prompting"
          @click="pdbCommand(th.threadId, ta.taskId, 'return')"
          >Return</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!ta.prompting"
          @click="pdbCommand(th.threadId, ta.taskId, 'step')"
          >Step</v-btn
        >
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        {{ ta.fileName }}
      </v-card-text>
    </v-card>
    <v-card
      class="mt-1 overflow-y-auto"
      max-height="400"
      :ref="`card-${th.threadId}-${ta.taskId}`"
    >
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row class="flex-nowrap">
            <!-- <v-col cols="2"> -->
            <div class="mr-3" style="min-width: 1em">
              <pre><code><span
                            v-for="i in source.length"
                            :key="i"
                            ><span :ref="`card-${th.threadId}-${ta.taskId}-line-${i}`">{{ i }}</span>{{ '\n' }}</span></code></pre>
            </div>
            <div class="mr-3" style="min-width: 2em">
              <pre><code>{{ "\n".repeat(ta.lineNo - 1) }}<v-icon :color='ta.prompting ? "primary" : "secondary lighten-4"'>mdi-arrow-right-bold</v-icon></code></pre>
            </div>
            <!-- </v-col> -->
            <!-- <v-col cols="10"> -->
            <div>
              <vue-code-highlight language="python">{{
                source
              }}</vue-code-highlight>
            </div>
            <!-- </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";
import "@/prism.css";

import SEND_PDB_COMMAND from "@/graphql/mutations/SendPdbCommand.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "ScriptExecCtrlInt",
  components: {
    VueCodeHighlight,
  },
  props: { th: Object, ta: Object },
  data: () => ({
    source: "",
  }),
  apollo: {
    source: {
      query: QUERY_SOURCE,
      variables() {
        return {
          fileName: this.ta.fileName,
        };
      },
      update(data) {
        return data.source.join("\n");
      },
    },
  },
  methods: {
    async pdbCommand(threadId, taskId, command) {
      const data = await this.$apollo.mutate({
        mutation: SEND_PDB_COMMAND,
        variables: { threadId, taskId, command },
      });
    },
    scroll() {
      // How to programmatically scroll an element instead of a page in vuetify
      // https://stackoverflow.com/a/64371340/7309855
      // https://jsfiddle.net/yjpq03da/

      if (!this.ta.prompting) {
        return;
      }

      const container_ref_name = `card-${this.th.threadId}-${this.ta.taskId}`;
      const target_ref_name = `${container_ref_name}-line-${this.ta.lineNo}`;

      if (!this.$refs[target_ref_name]) {
        return;
      }
      const target = this.$refs[target_ref_name][0];
      // Note: ref is an array when defined in v-for loop

      // target must be a Number/Selector/HTMLElement/VueComponent
      if (!target) {
        return;
      }

      if (!this.$refs[container_ref_name]) {
        return;
      }

      const container = this.$refs[container_ref_name];

      if (!container) {
        return;
      }

      this.$vuetify.goTo(target, { container });
    },
  },
  watch: {
    ta: {
      handler() {
        this.$nextTick(this.scroll);
      },
      immediate: true,
    },
  },
};
</script>

<style>
.v-application code {
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;
  line-height: 1.8;
}

.theme--light.v-application code {
  background-color: inherit;
}
</style>