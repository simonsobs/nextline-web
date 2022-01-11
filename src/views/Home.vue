<template>
  <v-container fluid fill-height class="grey lighten-3">
    <!-- https://vuetifyjs.com/en/styles/flex/#flex-grow-and-shrink -->
    <!-- https://github.com/vuetifyjs/vuetify/issues/8906#issuecomment-531459503 -->
    <v-row class="fill-height flex-column flex-nowrap justify-start">
      <v-col class="flex-grow-0">
        <main-ctrl
          :editing="editing"
          :nextline-state="nextlineState"
          :thread-task-ids="threadTaskIds"
          :layout="layout"
          @layout-change="layout = $event"
          @reset="reset"
        ></main-ctrl>
      </v-col>
      <v-col v-if="exception" class="flex-grow-0">
        <v-alert type="error" class="my-2">
          <pre
            v-text="exception"
            style="white-space: pre-wrap; overflow-wrap: anywhere"
          ></pre>
        </v-alert>
      </v-col>
      <v-col v-if="nextlineState == 'running'" style="min-height: 240px">
        <v-container
          v-if="layout == 'grid'"
          fluid
          fill-height
          pa-0
          class="align-stretch"
        >
          <v-row>
            <v-col
              :cols="cols"
              :md="md"
              :lg="lg"
              v-for="threadTaskId in threadTaskIds"
              :key="`${threadTaskId.threadId}-${threadTaskId.taskId}`"
            >
              <script-exec-ctrl-int
                :threadId="threadTaskId.threadId"
                :taskId="threadTaskId.taskId"
              ></script-exec-ctrl-int>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else fluid fill-height pa-0 class="align-stretch">
          <v-row class="fill-height flex-column flex-nowrap justify-start">
            <v-col class="flex-grow-0 py-0 pr-5">
              <v-tabs show-arrows v-model="tab">
                <v-tab
                  v-for="threadTaskId in threadTaskIds"
                  :key="`${threadTaskId.threadId}-${threadTaskId.taskId}`"
                >
                  {{ threadTaskId.threadId }}
                  <span v-if="threadTaskId.taskId">
                    -{{ threadTaskId.taskId }}
                  </span>
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col>
              <v-tabs-items v-model="tab" class="fill-height">
                <v-tab-item
                  v-for="threadTaskId in threadTaskIds"
                  :key="`${threadTaskId.threadId}-${threadTaskId.taskId}`"
                  class="fill-height"
                >
                  <script-exec-ctrl-int
                    :threadId="threadTaskId.threadId"
                    :taskId="threadTaskId.taskId"
                  ></script-exec-ctrl-int>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col v-else style="min-height: 240px">
        <script-viewer v-model="editing"></script-viewer>
      </v-col>
      <v-col style="max-height: 20vh">
        <v-card outlined flat height="100%" class="grey lighten-5">
          <v-card-text style="height: 100%" class="py-1">
            <pre
              style="height: 100%"
              class="overflow-auto"
              ref="col-stdout">{{ stdout }}<span ref="stdout-bottom"></span></pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainCtrl from "@/components/MainCtrl.vue";
import ScriptExecCtrlInt from "@/components/ScriptExecCtrlInt.vue";
import ScriptViewer from "@/components/ScriptViewer.vue";

import QUERY_EXCEPTION from "@/graphql/queries/Exception.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_THREAD_TASK_IDS from "@/graphql/subscriptions/ThreadTaskIds.gql";
import SUBSCRIBE_STDOUT from "@/graphql/subscriptions/Stdout.gql";

export default {
  name: "Home",
  components: {
    MainCtrl,
    ScriptExecCtrlInt,
    ScriptViewer,
  },
  data: () => ({
    editing: false,
    layout: "grid", // "grid", "tabs"
    tab: null,
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
      return 12;
    },
    md() {
      if (this.threadTaskIds.length <= 1) return 12;
      else return 6;
    },
    lg() {
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
    reset() {
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
