<template>
  <v-card-actions class="flex-row flex-wrap justify-end pa-1">
    <v-btn
      variant="outlined"
      prepend-icon="mdi-play"
      :disabled="disabled"
      @click="pdbCommand('continue')"
    >
      continue running
    </v-btn>
    <v-btn
      variant="flat"
      prepend-icon="mdi-skip-next"
      :disabled="disabled"
      @click="pdbCommand('next')"
    >
      1 line
    </v-btn>
    <v-menu location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-horizontal" :disabled="disabled">
        </v-btn>
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
import { withDefaults, toRefs } from "vue";
import { useSendPdbCommandMutation } from "@/gql/graphql";
import { useKeyboardShortcuts } from "./keyboard-shortcuts";

interface Props {
  traceNo: number;
  promptNo: number;
  disabled?: boolean;
  keyboardEvent?: KeyboardEvent | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { promptNo, traceNo, disabled, keyboardEvent } = toRefs(props);

const { executeMutation } = useSendPdbCommandMutation();

async function pdbCommand(command: string) {
  await executeMutation({
    command,
    promptNo: promptNo.value,
    traceNo: traceNo.value,
  });
}

useKeyboardShortcuts(traceNo, promptNo, disabled, keyboardEvent);
</script>
