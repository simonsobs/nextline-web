<template>
  <VCardActions class="flex-row flex-wrap justify-end pa-1">
    <VBtn
      variant="outlined"
      prepend-icon="mdi-play"
      :disabled="disabled"
      @click="pdbCommand('continue')"
    >
      continue running
    </VBtn>
    <VBtn
      variant="flat"
      prepend-icon="mdi-skip-next"
      :disabled="disabled"
      @click="pdbCommand('next')"
    >
      1 line
    </VBtn>
    <VMenu location="top">
      <template v-slot:activator="{ props }">
        <VBtn v-bind="props" icon="mdi-dots-horizontal" :disabled="disabled"> </VBtn>
      </template>
      <VList>
        <VListItem @click="pdbCommand('step')">
          <template v-slot:prepend>
            <VIcon> mdi-debug-step-into </VIcon>
          </template>
          Step Into A Function
        </VListItem>
        <VListItem @click="pdbCommand('return')">
          <template v-slot:prepend>
            <VIcon> mdi-keyboard-return </VIcon>
          </template>
          Run Until Return
        </VListItem>
      </VList>
    </VMenu>
  </VCardActions>
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
