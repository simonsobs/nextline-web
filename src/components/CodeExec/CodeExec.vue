<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keydown.stop.prevent="keyboardEvent = $event"
    class="code-exec grey lighten-5"
  >
    <template v-if="threadTaskState">
      <system-bar :state="threadTaskState">></system-bar>
      <v-container fluid style="height: 100%">
        <!-- <v-container fluid fill-height> too tall somehow -->
        <v-row class="fill-height flex-column flex-nowrap justify-start">
          <v-col class="flex-grow-0 pa-0">
            <cmd-col
              :threadId="threadId"
              :taskId="taskId"
              :disabled="!threadTaskState.prompting"
              :keyboard-event="keyboardEvent"
            ></cmd-col>
          </v-col>
          <v-divider></v-divider>
          <v-col class="overflow-hidden pa-0">
            <code-col :state="threadTaskState"></code-col>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script>
import SUBSCRIBE_THREAD_TASK_STATE from "@/graphql/subscriptions/ThreadTaskState.gql";

import SystemBar from "./SystemBar.vue";
import CmdCol from "./CmdCol.vue";
import CodeCol from "./CodeCol.vue";

export default {
  name: "CodeExec",
  components: {
    SystemBar,
    CmdCol,
    CodeCol,
  },
  props: { threadId: String, taskId: String },
  data() {
    return {
      threadTaskState: null,
      keyboardEvent: null,
    };
  },
  apollo: {
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
};
</script>

<style scoped>
.code-exec {
  cursor: default;
}

.code-exec:before {
  background: inherit; /* prevent highlight when focused */
}
</style>
