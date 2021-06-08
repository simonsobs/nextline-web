<template>
  <div tabindex="0" @keypress.stop.prevent="keyPress($event)">
    <v-card v-if="threadTaskState">
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="!threadTaskState.prompting"
          @click="pdbCommand('next')"
          >Next</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!threadTaskState.prompting"
          @click="pdbCommand('continue')"
          >Continue</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!threadTaskState.prompting"
          @click="pdbCommand('return')"
          >Return</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!threadTaskState.prompting"
          @click="pdbCommand('step')"
          >Step</v-btn
        >
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        {{ threadTaskState.fileName }}
      </v-card-text>
    </v-card>
    <v-card
      v-if="threadTaskState"
      class="mt-1 overflow-y-auto"
      max-height="400"
      ref="card-source"
    >
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row class="flex-nowrap">
            <!-- <v-col cols="2"> -->
            <div class="mr-3" style="min-width: 1em">
              <pre><code><span
                            v-for="i in sourceLines.length"
                            :key="i"
                            ><span :ref="`card-source-line-${i}`">{{ i }}</span>{{ '\n' }}</span></code></pre>
            </div>
            <div class="mr-3" style="min-width: 2em">
              <pre><code>{{ "\n".repeat(threadTaskState.lineNo - 1) }}<v-icon :color='threadTaskState.prompting ? "primary" : "secondary lighten-4"'>mdi-arrow-right-bold</v-icon></code></pre>
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
import SUBSCRIBE_THREAD_TASK_STATE from "@/graphql/subscriptions/ThreadTaskState.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "ScriptExecCtrlInt",
  components: {
    VueCodeHighlight,
  },
  props: { threadId: String, taskId: String },
  data: () => ({
    threadTaskState: null,
    sourceLines: [],
  }),
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
          fileName: this.threadTaskState.fileName,
        };
      },
      skip() {
        return !this.threadTaskState;
      },
      update(data) {
        return data.source;
      },
      result() {
        this.$nextTick(this.scroll);
      },
    },
    $subscribe: {
      threadTaskState: {
        query: SUBSCRIBE_THREAD_TASK_STATE,
        variables() {
          return {
            threadId: this.threadId,
            taskId: this.taskId,
          };
        },
        result({ data }) {
          this.threadTaskState = data.threadTaskState;
        },
      },
    },
  },
  methods: {
    async pdbCommand(command) {
      const data = await this.$apollo.mutate({
        mutation: SEND_PDB_COMMAND,
        variables: { threadId: this.threadId, taskId: this.taskId, command },
      });
    },
    async keyPress(event) {
      if (!this.threadTaskState.prompting) {
        return;
      }
      console.log(event);
      console.log(event.key);
      let command;
      if (event.key == "n") {
        command = "next";
      } else if (event.key == "c") {
        command = "continue";
      } else if (event.key == "r") {
        command = "return";
      } else if (event.key == "s") {
        command = "step";
      } else {
        return;
      }
      this.pdbCommand(command);
    },
    scroll() {
      // How to programmatically scroll an element instead of a page in vuetify
      // https://stackoverflow.com/a/64371340/7309855
      // https://jsfiddle.net/yjpq03da/

      if (!this.threadTaskState) {
        return;
      }

      if (!this.threadTaskState.prompting) {
        return;
      }

      const container_ref_name = "card-source";
      const target_ref_name = `card-source-line-${this.threadTaskState.lineNo}`;

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
    threadTaskState: {
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