<template>
  <v-container fluid fill-height>
    <!-- https://vuetifyjs.com/en/styles/flex/#flex-grow-and-shrink -->
    <!-- https://github.com/vuetifyjs/vuetify/issues/8906#issuecomment-531459503 -->
    <v-row dense class="fill-height flex-column flex-nowrap justify-start">
      <v-col class="flex-grow-0">
        <v-card outlined flat>
          <v-card-actions>
            <v-btn
              outlined
              text
              v-for="(b, i) in buttons"
              :key="i"
              color="primary"
              :disabled="editing || !b.states.includes(nextlineState)"
              @click="onClick(b.method)"
            >
              <v-icon left>
                {{ b.icon }}
              </v-icon>
              {{ b.text }}
            </v-btn>
            <v-chip outlined class="mx-2">{{ nextlineState }}</v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="exception" class="flex-grow-0">
        <v-alert type="error" class="my-2">
          <pre style="white-space: pre-wrap; overflow-wrap: anywhere">{{
            exception
          }}</pre>
        </v-alert>
      </v-col>
      <v-col style="min-height: 240px">
        <v-container
          v-if="nextlineState == 'running'"
          fluid
          fill-height
          pa-0
          class="align-stretch"
        >
          <v-row dense>
            <v-col
              :cols="cols"
              v-for="threadTaskId in threadTaskIds"
              :key="threadTaskId.threadId + '-' + threadTaskId.taskId"
            >
              <script-exec-ctrl-int
                :threadId="threadTaskId.threadId"
                :taskId="threadTaskId.taskId"
              ></script-exec-ctrl-int>
            </v-col>
          </v-row>
        </v-container>
        <script-viewer v-else v-model="editing"></script-viewer>
      </v-col>
      <v-col style="max-height: 20vh" class="overflow-hidden">
        <v-card
          outlined
          flat
          height="100%"
          ref="col-stdout"
          class="overflow-y-auto"
        >
          <v-card-text>
            <pre>{{ stdout }}</pre>
            <div ref="stdout-bottom"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScriptExecCtrlInt from "@/components/ScriptExecCtrlInt.vue";
import ScriptViewer from "@/components/ScriptViewer.vue";

import QUERY_EXCEPTION from "@/graphql/queries/Exception.gql";
import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_THREAD_TASK_IDS from "@/graphql/subscriptions/ThreadTaskIds.gql";
import SUBSCRIBE_STDOUT from "@/graphql/subscriptions/Stdout.gql";

export default {
  name: "Home",
  components: {
    ScriptExecCtrlInt,
    ScriptViewer,
  },
  data: () => ({
    editing: false,
    buttons: [
      {
        text: "Run",
        method: "run",
        icon: "mdi-play",
        states: ["initialized"],
      },
      {
        text: "Reset",
        method: "reset",
        icon: "mdi-restore",
        states: ["initialized", "finished", "closed"],
      },
    ],
    nextlineState: null,
    threadTaskIds: [],
    stdout: "",
    exception: null,
  }),
  apollo: {
    exception: {
      query: QUERY_EXCEPTION,
      skip() {
        return this.nextlineState != "finished";
      },
      update(data) {
        return data.exception;
      },
    },
    $subscribe: {
      nextlineState: {
        query: SUBSCRIBE_GLOBAL_STATE,
        result({ data }) {
          this.nextlineState = data.globalState;
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
  },
  watch: {
    stdout: {
      handler() {
        this.$nextTick(this.scrollStdout);
      },
      immediate: true,
    },
  },
  methods: {
    async onClick(method) {
      await this[method]();
    },
    async run() {
      const data = await this.$apollo.mutate({
        mutation: EXEC,
      });
    },
    async reset() {
      const data = await this.$apollo.mutate({
        mutation: RESET,
      });
      this.stdout = "";
      this.exception = null;
    },
    scrollStdout() {
      const container_ref_name = "col-stdout";
      const target_ref_name = "stdout-bottom";

      const container = this.$refs[container_ref_name];
      if (!container) {
        return;
      }

      const target = this.$refs[target_ref_name];
      if (!target) {
        return;
      }

      console.log(container);
      console.log(target);
      this.$vuetify.goTo(target, { container, duration: 0 });
      // this.$vuetify.goTo(99999, { container });
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
