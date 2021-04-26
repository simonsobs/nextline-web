<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-actions>
              <v-btn
                color="primary"
                :disabled="!(globalState == 'initialized')"
                @click="run()"
                >Run</v-btn
              >
              <v-btn color="primary" @click="reset()">Reset</v-btn>
            </v-card-actions>
            <v-card-text>
              <pre>{{ globalState }}</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="overflow-x-auto">
            <v-card-text>
              <pre>{{ stdout }}</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="state.threads">
          <template v-for="th in state.threads">
            <template v-for="ta in th.tasks">
              <v-col
                :cols="cols"
                v-if="ta.fileName"
                :key="th.threadId + '-' + ta.taskId"
              >
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
                            v-for="i in ta.fileLines.length"
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
                            ta.fileLines.join("\n")
                          }}</vue-code-highlight>
                        </div>
                        <!-- </v-col> -->
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </template>
        </template>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-card>
            <v-card-text
              ><pre>{{ state }}</pre></v-card-text
            >
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";
import "@/prism.css";

// import gql from "graphql-tag";

import SEND_PDB_COMMAND from "@/graphql/mutations/SendPdbCommand.gql";
import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_STDOUT from "@/graphql/subscriptions/Stdout.gql";
import SUBSCRIBE_COUNTER from "@/graphql/subscriptions/Counter.gql";

const codeLines = ["import script", "script.run()"];

export default {
  name: "Home",
  components: {
    VueCodeHighlight,
  },
  data: () => ({
    counter: null,
    globalState: null,
    state: {},
    code: codeLines.join("\n"),
    nlines: codeLines.length,
    stdout: "",
  }),
  apollo: {
    $subscribe: {
      counter: {
        query: SUBSCRIBE_COUNTER,
        result({ data }) {
          this.counter = data.counter;
        },
      },
      globalState: {
        query: SUBSCRIBE_GLOBAL_STATE,
        result({ data }) {
          this.globalState = data.globalState;
        }
      },
      state: {
        query: SUBSCRIBE_STATE,
        result({ data }) {
          this.state = data.state;
        },
      },
      stdout: {
        query: SUBSCRIBE_STDOUT,
        result({ data }) {
          this.stdout += data.stdout;
        },
      },
    },
  },
  computed: {
    cols() {
      if (this.ntasks <= 1) return 12;
      else if (this.ntasks == 2) return 6;
      else return 4;
    },
    ntasks() {
      if (!this.state.threads) {
        return 0;
      } else if (!(this.state.threads.length > 0)) {
        return 0;
      } else {
        const ret = this.state.threads.reduce((a, th) => {
          return a + th.tasks.length;
        }, 0);
        return ret;
      }
    },
  },
  methods: {
    async run() {
      console.log("run");
      const data = await this.$apollo.mutate({
        mutation: EXEC,
      });
    },
    async reset() {
      console.log("reset");
      const data = await this.$apollo.mutate({
        mutation: RESET,
      });
      this.stdout = "";
    },
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

      for (const th of this.state.threads) {
        for (const ta of th.tasks) {
          if (!ta.prompting) {
            continue;
          }

          const container_ref_name = `card-${th.threadId}-${ta.taskId}`;
          const target_ref_name = `${container_ref_name}-line-${ta.lineNo}`;

          if (!this.$refs[target_ref_name]) {
            continue;
          }
          const target = this.$refs[target_ref_name][0];
          // Note: ref is an array when defined in v-for loop

          // target must be a Number/Selector/HTMLElement/VueComponent
          if (!target) {
            continue;
          }

          if (!this.$refs[container_ref_name]) {
            continue;
          }
          const container = this.$refs[container_ref_name][0];
          // Note: ref is an array when defined in v-for loop

          if (!container) {
            continue;
          }

          this.$vuetify.goTo(target, { container });
        }
      }
    },
  },
  watch: {
    state: function () {
      this.$nextTick(this.scroll);
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