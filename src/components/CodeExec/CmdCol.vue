<template>
  <v-card-actions class="flex-row flex-wrap pa-1">
    <v-tooltip bottom open-delay="500" v-for="(b, i) in buttons" :key="i">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          icon
          outlined
          :disabled="disabled"
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
</template>

<script>
import SEND_PDB_COMMAND from "@/graphql/mutations/SendPdbCommand.gql";

export default {
  name: "CmdCol",
  props: {
    threadId: { type: String, required: true },
    taskId: String,
    disabled: { type: Boolean, default: false },
    keyboardEvent: KeyboardEvent,
  },
  data() {
    return {
      buttons: [
        { text: "(N)ext", command: "next", icon: "mdi-skip-next" },
        { text: "(S)tep", command: "step", icon: "mdi-debug-step-into" },
        { text: "(R)eturn", command: "return", icon: "mdi-keyboard-return" },
        { text: "(C)ontinue", command: "continue", icon: "mdi-play" },
      ],
      keyboardShortcuts: {
        n: "next",
        c: "continue",
        r: "return",
        s: "step",
      },
    };
  },
  methods: {
    async pdbCommand(command) {
      const data = await this.$apollo.mutate({
        mutation: SEND_PDB_COMMAND,
        variables: { threadId: this.threadId, taskId: this.taskId, command },
      });
    },
  },
  watch: {
    async keyboardEvent(event) {
      if (this.disabled) return;
      const command = this.keyboardShortcuts[event.key];
      if (!command) return;
      await this.pdbCommand(command);
    },
  },
};
</script>
