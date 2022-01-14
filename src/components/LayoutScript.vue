<template>
  <div class="fill-height">
    <v-container
      v-if="nextlineState == 'running'"
      fluid
      fill-height
      pa-0
      class="align-stretch"
    >
      <v-row v-if="layout == 'grid'">
        <v-col
          :cols="cols"
          :md="md"
          :lg="lg"
          v-for="threadTaskId in threadTaskIds"
          :key="`${threadTaskId.threadId}-${threadTaskId.taskId}`"
        >
          <code-exec
            :threadId="threadTaskId.threadId"
            :taskId="threadTaskId.taskId"
          ></code-exec>
        </v-col>
      </v-row>
      <v-row v-else class="fill-height flex-column flex-nowrap justify-start">
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
              <code-exec
                :threadId="threadTaskId.threadId"
                :taskId="threadTaskId.taskId"
              ></code-exec>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    <script-viewer v-else v-model="editing"></script-viewer>
  </div>
</template>


<script>
import CodeExec from "@/components/CodeExec/CodeExec.vue";
import ScriptViewer from "@/components/ScriptViewer.vue";

import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_THREAD_TASK_IDS from "@/graphql/subscriptions/ThreadTaskIds.gql";

export default {
  name: "LayoutScript",
  components: {
    CodeExec,
    ScriptViewer,
  },
  data() {
    return {
      editing: false,
      tab: null,
      nextlineState: null,
      threadTaskIds: [],
    };
  },
  apollo: {
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
    },
  },
  computed: {
    layout() {
      return this.$store.state.layout;
    },
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
    editing(val) {
      this.$store.dispatch("editing", val);
    },
  },
};
</script>

<style>
</style>
