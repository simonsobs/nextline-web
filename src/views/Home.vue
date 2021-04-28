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
                <script-exec-ctrl-int :th="th" :ta="ta"></script-exec-ctrl-int>
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
// import gql from "graphql-tag";

import ScriptExecCtrlInt from "@/components/ScriptExecCtrlInt.vue";

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
    ScriptExecCtrlInt,
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
        },
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
  },
};
</script>
