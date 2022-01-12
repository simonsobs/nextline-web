<template>
  <v-card flat class="grey lighten-5">
    <v-card-actions class="flex-wrap">
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
      <v-chip v-if="chip" :color="chip.color" class="text-capitalize mx-2">
        {{ nextlineState }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn-toggle
        v-if="nextlineState == 'running' && threadTaskIds.length > 1"
        mandatory
        borderless
        v-model="layout"
        color="grey lighten-1"
      >
        <v-btn icon value="tabs">
          <v-icon>mdi-tab</v-icon>
        </v-btn>
        <v-btn icon value="grid">
          <v-icon>mdi-grid-large</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>

<script>
import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";
import SUBSCRIBE_THREAD_TASK_IDS from "@/graphql/subscriptions/ThreadTaskIds.gql";

export default {
  name: "MainCtrl",
  data() {
    return {
      layout: "grid", // "grid", "tabs"
      nextlineState: null,
      threadTaskIds: [],
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
      chipConfig: {
        default: { color: null },
        initialized: { color: "success" },
        running: { color: "primary" },
        exited: { color: "warning" },
        finished: { color: "warning" },
        closed: { color: "warning" },
      },
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
    editing() {
      return this.$store.state.editing;
    },
    chip() {
      return this.chipConfig[this.nextlineState] || this.chipConfig.default;
    },
  },
  watch: {
    layout(val) {
      this.$store.dispatch("layout", val);
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
      this.$store.dispatch("reset");
    },
  },
};
</script>
