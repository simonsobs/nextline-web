<template>
  <v-card flat class="grey lighten-5">
    <v-card-actions class="flex-wrap" style="row-gap: 8px">
      <span>
        Run: <span class="font-weight-medium"> {{ runNo }} </span>
      </span>
      <v-chip v-if="chip" :color="chip.color" class="text-capitalize mx-2">
        {{ nextlineState }}
      </v-chip>
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

<script setup lang="ts">
import { ref, computed } from "vue";

import { useStore } from "@/stores/main";

import {
  useResetMutation,
  useExecMutation,
  useInterruptMutation,
  useTerminateMutation,
  useKillMutation,
  useStateSubscription,
  useTraceIdsSubscription,
  useRunNoSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";

const stateSubscription = useStateSubscription();
const nextlineState = computed(
  () => stateSubscription.data?.value?.state || "unknown"
);

const runNoSubscription = useRunNoSubscription();
const runNo = computed(() => runNoSubscription.data?.value?.runNo);

const traceIdsSubscription = useTraceIdsSubscription();
const traceIds = computed(
  () => traceIdsSubscription.data?.value?.traceIds || []
);

type Method = "run" | "reset" | "interrupt" | "terminate" | "kill";
interface Button {
  method: Method;
  text: string;
  icon: string;
  states: string[];
}

const buttons = ref<Button[]>([
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
const { modified: editing } = storeToRefs(store);

const chip = computed(
  () => chipConfig.value[nextlineState.value] || chipConfig.value.default
);

async function onClick(method: Method) {
  if (method === "run") {
    await executeExec({});
  } else if (method === "reset") {
    await executeReset({});
  } else if (method === "interrupt") {
    await executeInterrupt({});
  } else if (method === "terminate") {
    await executeTerminate({});
  } else if (method === "kill") {
    await executeKill({});
  }
}

const { executeMutation: executeExec } = useExecMutation();
const { executeMutation: executeReset } = useResetMutation();
const { executeMutation: executeInterrupt } = useInterruptMutation();
const { executeMutation: executeTerminate } = useTerminateMutation();
const { executeMutation: executeKill } = useKillMutation();
</script>
