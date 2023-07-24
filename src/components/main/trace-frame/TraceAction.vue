<template>
  <v-card-actions class="flex-row flex-wrap pa-1">
    <v-btn
      variant="flat"
      prepend-icon="mdi-skip-next"
      :disabled="disabled"
      @click="pdbCommand('next')"
    >
      1 line
    </v-btn>
    <v-btn
      variant="outlined"
      prepend-icon="mdi-play"
      :disabled="disabled"
      @click="pdbCommand('continue')"
    >
      continue running
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-horizontal" :disabled="disabled"> </v-btn>
      </template>
      <v-list>
        <v-list-item @click="pdbCommand('step')">
          <template v-slot:prepend>
            <v-icon> mdi-debug-step-into </v-icon>
          </template>
          Step Into A Function
        </v-list-item>
        <v-list-item @click="pdbCommand('return')">
          <template v-slot:prepend>
            <v-icon> mdi-keyboard-return </v-icon>
          </template>
          Run Until Return
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import { reactive, watch, withDefaults } from "vue";

import { useSendPdbCommandMutation } from "@/gql/graphql";

interface Props {
  traceNo: number;
  promptNo: number;
  disabled?: boolean;
  keyboardEvent?: KeyboardEvent | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

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
    if (props.disabled) return;
    if (!event) return;
    if (event.metaKey) return;
    if (event.ctrlKey) return;
    const command = keyboardShortcuts[event.key];
    if (!command) return;
    event.preventDefault();
    event.stopPropagation();
    await pdbCommand(command);
  }
);
</script>
