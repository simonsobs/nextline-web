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
      <v-menu>
        <template v-slot:activator="{ on, attr }">
          <v-btn icon v-bind="attr" v-on="on">
            <v-icon> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            :disabled="nextlineState !== 'running'"
            @click="onClick('terminate')"
          >
            <v-list-item-icon>
              <v-icon> mdi-close-octagon-outline </v-icon>
            </v-list-item-icon>
            <v-list-item-content> Terminate </v-list-item-content>
          </v-list-item>
          <v-list-item
            :disabled="nextlineState !== 'running'"
            @click="onClick('kill')"
          >
            <v-list-item-icon>
              <v-icon> mdi-close-octagon </v-icon>
            </v-list-item-icon>
            <v-list-item-content> Kill </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { mapStores } from "pinia";

import { useStore } from "@/stores/index";

import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import INTERRUPT from "@/graphql/mutations/Interrupt.gql";
import TERMINATE from "@/graphql/mutations/Terminate.gql";
import KILL from "@/graphql/mutations/Kill.gql";
import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_TRACE_IDS from "@/graphql/subscriptions/TraceIds.gql";

export default Vue.extend({
  name: "MainCtrl",
  data() {
    return {
      nextlineState: null,
      traceIds: [],
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
        {
          text: "Interrupt",
          method: "interrupt",
          icon: "mdi-close",
          states: ["running"],
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
        query: SUBSCRIBE_STATE,
        result({ data }) {
          this.nextlineState = data.state;
        },
      },
      traceIds: {
        query: SUBSCRIBE_TRACE_IDS,
        result({ data }) {
          this.traceIds = data.traceIds;
        },
      },
    },
  },
  computed: {
    editing() {
      return this.mainStore.modified;
    },
    chip() {
      return this.chipConfig[this.nextlineState] || this.chipConfig.default;
    },
    ...mapStores(useStore),
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
    },
    async interrupt() {
      const data = await this.$apollo.mutate({
        mutation: INTERRUPT,
      });
    },
    async terminate() {
      const data = await this.$apollo.mutate({
        mutation: TERMINATE,
      });
    },
    async kill() {
      const data = await this.$apollo.mutate({
        mutation: KILL,
      });
    },
  },
});
</script>
