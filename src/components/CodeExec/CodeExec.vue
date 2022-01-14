<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keypress.stop.prevent="keyPress($event)"
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
            <code-col :thread-task-state="threadTaskState"></code-col>
            <v-card-text class="pa-0 fill-height">
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script>
const path = require("path");

import SEND_PDB_COMMAND from "@/graphql/mutations/SendPdbCommand.gql";
import SUBSCRIBE_THREAD_TASK_STATE from "@/graphql/subscriptions/ThreadTaskState.gql";

import CodeCol from "./CodeCol.vue";

export default {
  name: "CodeExec",
  components: {
    CodeCol,
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
    basename() {
      if (!this.threadTaskState) {
        return null;
      }
      return path.basename(this.threadTaskState.fileName);
    },
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
  },
};
</script>
