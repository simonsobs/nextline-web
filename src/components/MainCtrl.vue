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
import { defineComponent, ref, computed, watch } from "vue";
import { useMutation, useSubscription } from "@urql/vue";

import { useStore } from "@/stores/main";

import RESET from "@/graphql/mutations/Reset.gql";
import EXEC from "@/graphql/mutations/Exec.gql";
import INTERRUPT from "@/graphql/mutations/Interrupt.gql";
import TERMINATE from "@/graphql/mutations/Terminate.gql";
import KILL from "@/graphql/mutations/Kill.gql";
import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_TRACE_IDS from "@/graphql/subscriptions/TraceIds.gql";

export default defineComponent({
  name: "MainCtrl",
  setup() {
    const nextlineState = ref<string>("");
    const stateSubscription = useSubscription<{ state: string }>({
      query: SUBSCRIBE_STATE,
    });
    watch(stateSubscription.data, (val) => {
      nextlineState.value = val?.state || "";
    });

    const traceIds = ref<number[]>([]);
    const traceIdsSubscription = useSubscription<{ traceIds: number[] }>({
      query: SUBSCRIBE_TRACE_IDS,
    });
    watch(traceIdsSubscription.data, (val) => {
      traceIds.value = val?.traceIds || [];
    });

    const buttons = ref([
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
    ]);

    const chipConfig = ref({
      default: { color: null },
      initialized: { color: "success" },
      running: { color: "primary" },
      exited: { color: "warning" },
      finished: { color: "warning" },
      closed: { color: "warning" },
    });

    const store = useStore();
    const editing = computed(() => store.modified);

    const chip = computed(
      () => chipConfig.value[nextlineState.value] || chipConfig.value.default
    );

    async function onClick(method: string) {
      if (method === "run") {
        await executeExec();
      } else if (method === "reset") {
        await executeReset();
      } else if (method === "interrupt") {
        await executeInterrupt();
      } else if (method === "terminate") {
        await executeTerminate();
      } else if (method === "kill") {
        await executeKill();
      }
    }

    const { executeMutation: executeExec } = useMutation(EXEC);
    const { executeMutation: executeReset } = useMutation(RESET);
    const { executeMutation: executeInterrupt } = useMutation(INTERRUPT);
    const { executeMutation: executeTerminate } = useMutation(TERMINATE);
    const { executeMutation: executeKill } = useMutation(KILL);

    return {
      nextlineState,
      traceIds,
      buttons,
      chipConfig,
      editing,
      chip,
      onClick,
    };
  },
});
</script>
