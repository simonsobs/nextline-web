<template>
  <v-card flat class="d-flex">
    <v-card-actions class="flex-wrap" style="row-gap: 8px">
      <span>
        Run: <span class="font-weight-medium"> {{ runNo }} </span>
      </span>
      <span class="text-capitalize text-primary font-weight-bold mx-3">
        {{ nextlineState }}
      </span>
      <v-btn
        v-for="b in buttons"
        :key="`sm-${b.text}`"
        variant="outlined"
        color="primary"
        :disabled="editing"
        @click="onClick(b.method)"
        :prepend-icon="b.icon"
      >
        {{ b.text }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="menuItems.length">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
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
            <template v-slot:prepend>
              <v-icon> {{ b.icon }} </v-icon>
            </template>
            {{ b.text }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="dialog" max-width="290">
        <run-confirmation-dialog
          @confirm="onStartConfirmed"
          @cancel="dialog = false"
        >
        </run-confirmation-dialog>
      </v-dialog>
    </v-card-actions>
  </v-card>
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
  useRunNoSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";
import RunConfirmationDialog from "./RunConfirmationDialog.vue";

const stateSubscription = useStateSubscription();
const nextlineState = computed(
  () => stateSubscription.data?.value?.state || "unknown"
);

const runNoSubscription = useRunNoSubscription();
const runNo = computed(() => runNoSubscription.data?.value?.runNo);

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

const store = useStore();
const { modified: editing } = storeToRefs(store);

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
