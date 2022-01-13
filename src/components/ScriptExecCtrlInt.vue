<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keypress.stop.prevent="keyPress($event)"
    id="script-exec-ctrl-int-card"
    class="grey lighten-5"
  >
    <template v-if="threadTaskState">
      <v-system-bar :class="systemBarClass">
        <v-icon :class="systemBarClass"> mdi-language-python </v-icon>
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ basename }}</span>
          </template>
          <span>{{ threadTaskState.fileName }}</span>
        </v-tooltip>
      </v-system-bar>
      <v-container fluid fill-height py-0>
        <v-row class="fill-height flex-column flex-nowrap justify-start">
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
                    :disabled="!threadTaskState.prompting"
                    @click="pdbCommand(b.command)"
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
          <v-col class="overflow-hidden pa-0">
            <v-card-text class="pa-0 fill-height">
              <v-container
                fluid
                fill-height
                ma-0
                pa-0
                ref="card-source"
                class="align-start overflow-y-auto"
              >
                <v-row class="ma-0 py-1 flex-nowrap" style="min-width: 0">
                  <div
                    class="pl-1 mr-3 flex-grow-0 flex-shrink-0"
                    style="min-width: 1em"
                  >
                    <pre><code><span
                            v-for="i in sourceLines.length"
                            :key="i"
                            ><span :ref="`card-source-line-${i}`">{{ i }}</span>{{ '\n' }}</span></code></pre>
                  </div>
                  <div
                    class="mr-3 flex-grow-0 flex-shrink-0"
                    style="min-width: 2em"
                  >
                    <pre><code>{{ "\n".repeat(threadTaskState.lineNo - 1) }}<v-icon :color='threadTaskState.prompting ? "primary" : "secondary"'>mdi-arrow-right-bold</v-icon></code></pre>
                  </div>
                  <div
                    class="pr-1 flex-grow-1 flex-shrink-1"
                    style="overflow-x: auto; flex-basis: 0; min-width: 2em"
                  >
                    <vue-code-highlight language="python">{{
                      source
                    }}</vue-code-highlight>
                  </div>
                </v-row>
              </v-container>
            </v-card-text>
            <!-- </v-card> -->
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script>
const path = require("path");

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
  data() {
    return {
      buttons: [
        { text: "(N)ext", command: "next", icon: "mdi-skip-next" },
        { text: "(S)tep", command: "step", icon: "mdi-debug-step-into" },
        { text: "(R)eturn", command: "return", icon: "mdi-keyboard-return" },
        { text: "(C)ontinue", command: "continue", icon: "mdi-play" },
      ],
      threadTaskState: null,
      sourceLines: [],
    };
  },
  computed: {
    systemBarClass() {
      return this.threadTaskState.prompting
        ? ["primary", "on-primary--text"]
        : [];
    },
    source() {
      return this.sourceLines.join("\n");
    },
    basename() {
      if (!this.threadTaskState) {
        return null;
      }
      return path.basename(this.threadTaskState.fileName);
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

      const container = this.$refs[container_ref_name];
      if (!container) {
        return;
      }

      const targets = this.$refs[target_ref_name];
      if (!targets) {
        return;
      }

      const target = targets[0];
      // Note: ref is an array when defined in v-for loop

      // target must be a Number/Selector/HTMLElement/VueComponent
      if (!target) {
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

<style scoped>
#script-exec-ctrl-int-card {
  cursor: default;
}

#script-exec-ctrl-int-card:before {
  background: inherit; /* prevent highlight when focused */
}
</style>