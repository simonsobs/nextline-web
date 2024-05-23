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
import { withDefaults } from "vue";
import { useCtrlSendPdbCommandMutation } from "@/graphql/codegen/generated";

interface Props {
  traceNo: number;
  promptNo: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { executeMutation } = useCtrlSendPdbCommandMutation();

async function pdbCommand(command: string) {
  await executeMutation({
    command,
    promptNo: props.promptNo,
    traceNo: props.traceNo,
  });
}
</script>
