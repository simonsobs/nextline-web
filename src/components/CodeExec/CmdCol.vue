<template>
  <v-card-actions class="flex-row flex-wrap pa-1">
    <v-tooltip bottom open-delay="500" v-for="(b, i) in buttons" :key="i">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="primary"
          icon
          outlined
          :disabled="disabled"
          @click="pdbCommand(b.command)"
          class="ma-1"
        >
          <v-icon>{{ b.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ b.text }}</span>
    </v-tooltip>
  </v-card-actions>
</template>

<script setup lang="ts">
import { reactive, ref, watch, withDefaults } from "vue";

import { useSendPdbCommandMutation } from "@/gql/graphql";

interface Props {
  traceNo: number;
  promptNo: number;
  disabled?: boolean;
  keyboardEvent?: KeyboardEvent;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// Use ref() instead of reactive() because of a Vue-2 only limitation
const buttons = ref([
  { text: "(N)ext", command: "next", icon: "mdi-skip-next" },
  { text: "(S)tep", command: "step", icon: "mdi-debug-step-into" },
  { text: "(R)eturn", command: "return", icon: "mdi-keyboard-return" },
  { text: "(C)ontinue", command: "continue", icon: "mdi-play" },
]);

const keyboardShortcuts = reactive({
  n: "next",
  c: "continue",
  r: "return",
  s: "step",
});

const { executeMutation } = useSendPdbCommandMutation();

async function pdbCommand(command: string) {
  await executeMutation({
    command,
    promptNo: props.promptNo,
    traceNo: props.traceNo,
  });
}

watch(
  () => props.keyboardEvent,
  async (event) => {
    if (!event) return;
    if (props.disabled) return;
    const command = keyboardShortcuts[event.key];
    if (!command) return;
    await pdbCommand(command);
  }
);
</script>
