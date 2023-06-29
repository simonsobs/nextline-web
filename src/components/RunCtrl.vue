<template>
  <v-card-actions class="flex-wrap" style="row-gap: 8px">
    <span>
      Run: <span class="font-weight-medium"> {{ runNo }} </span>
    </span>
    <v-chip v-if="chip" :color="chip.color" class="text-capitalize mx-2">
      {{ nextlineState }}
    </v-chip>
    <v-tooltip bottom open-delay="500" v-for="b in buttons" :key="b.text">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="d-flex d-sm-none ml-2"
          outlined
          icon
          color="primary"
          :disabled="editing"
          @click="onClick(b.method)"
          v-bind="attrs"
          v-on="on"
        >
          <!-- ml-2 is for the bug https://github.com/vuetifyjs/vuetify/issues/9756 -->
          <v-icon left>
            {{ b.icon }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ b.text }}</span>
    </v-tooltip>
    <v-btn
      class="d-none d-sm-flex"
      v-for="b in buttons"
      :key="`sm-${b.text}`"
      outlined
      text
      color="primary"
      :disabled="editing"
      @click="onClick(b.method)"
    >
      <v-icon left>
        {{ b.icon }}
      </v-icon>
      {{ b.text }}
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu offset-y v-if="menuItems.length">
      <template v-slot:activator="{ on, attr }">
        <v-btn icon v-bind="attr" v-on="on">
          <v-icon> mdi-dots-vertical </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="b in menuItems"
          :key="b.text"
          :disabled="editing"
          @click="onClick(b.method)"
        >
          <v-list-item-icon>
            <v-icon> {{ b.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content> {{ b.text }} </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title> Start running the script? </v-card-title>
        <v-card-text> Are you sure to start? </v-card-text>
        <v-card-actions>
          <v-btn text color="grey darken-2" @click="dialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="onStartConfirmed"> Start </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-actions>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";

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
type CommandUI = "button" | "menu";
interface Command {
  method: Method;
  text: string;
  icon: string;
  states: string[];
  ui: CommandUI[];
}

const commands = ref<Command[]>([
  {
    text: "Start",
    method: "run",
    icon: "mdi-play",
    states: ["initialized"],
    ui: ["button"],
  },
  {
    text: "Reset",
    method: "reset",
    icon: "mdi-restore",
    states: ["initialized", "finished", "closed"],
    ui: ["button"],
  },
  {
    text: "Interrupt",
    method: "interrupt",
    icon: "mdi-close",
    states: ["running"],
    ui: ["button"],
  },
  {
    text: "Terminate",
    method: "terminate",
    icon: "mdi-close-octagon-outline",
    states: ["running"],
    ui: ["menu"],
  },
  {
    text: "Kill",
    method: "kill",
    icon: "mdi-close-octagon",
    states: ["running"],
    ui: ["menu"],
  },
]);

const buttons = computed(() =>
  commands.value.filter(
    (c) => c.ui.includes("button") && c.states.includes(nextlineState.value)
  )
);

const menuItems = computed(() =>
  commands.value.filter(
    (c) => c.ui.includes("menu") && c.states.includes(nextlineState.value)
  )
);

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
    showConfirmationDialog();
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

function showConfirmationDialog() {
  dialog.value = true;
}

async function onStartConfirmed() {
  dialog.value = false;
  await executeExec({});
}

watch(nextlineState, () => {
  if (nextlineState.value !== "initialized") {
    dialog.value = false;
  }
});

const dialog = ref(false);
</script>
