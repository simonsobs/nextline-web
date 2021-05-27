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
              <v-btn
                color="primary"
                :disabled="!this.resettable"
                @click="reset()"
                >Reset</v-btn
              >
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
        <template v-for="threadTaskId in threadTaskIds">
          <v-col
            :cols="cols"
            :key="threadTaskId.threadId + '-' + threadTaskId.taskId"
          >
            <script-exec-ctrl-int
              :threadId="threadTaskId.threadId"
              :taskId="threadTaskId.taskId"
            ></script-exec-ctrl-int>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ScriptExecCtrlInt from "@/components/ScriptExecCtrlInt.vue";

import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_THREAD_TASK_IDS from "@/graphql/subscriptions/ThreadTaskIds.gql";
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
    threadTaskIds: [],
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
      threadTaskIds: {
        query: SUBSCRIBE_THREAD_TASK_IDS,
        result({ data }) {
          this.threadTaskIds = data.threadTaskIds;
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
      if (this.threadTaskIds.length <= 1) return 12;
      else if (this.threadTaskIds.length == 2) return 6;
      else return 4;
    },
    resettable() {
      return ["initialized", "finished", "closed"].includes(this.globalState);
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
