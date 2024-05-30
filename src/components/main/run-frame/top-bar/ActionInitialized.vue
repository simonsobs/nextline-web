<template>
  <VSpacer></VSpacer>
  <VBtn variant="outlined" :disabled="editing" @click="dialogRunInter = true">
    run interactively
  </VBtn>
  <VBtn
    variant="flat"
    prepend-icon="mdi-play"
    :disabled="editing"
    @click="dialogRun = true"
  >
    run
  </VBtn>
  <VDialog v-model="dialogRunInter" max-width="400">
    <RunInterConfirmationDialog
      @confirm="onRunInterConfirmed"
      @cancel="dialogRunInter = false"
    >
    </RunInterConfirmationDialog>
  </VDialog>
  <VDialog v-model="dialogRun" max-width="400">
    <RunConfirmationDialog @confirm="onRunConfirmed" @cancel="dialogRun = false">
    </RunConfirmationDialog>
  </VDialog>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";

import { useStore } from "@/plugins/pinia/stores/main";

import {
  useCtrlExecMutation,
  useCtrlRunAndContinueMutation,
} from "@/graphql/codegen/generated";

import RunInterConfirmationDialog from "./RunInterConfirmationDialog.vue";
import RunConfirmationDialog from "./RunConfirmationDialog.vue";

const store = useStore();
const { modified: editing } = storeToRefs(store);

const { executeMutation: executeExec } = useCtrlExecMutation();
const { executeMutation: executeRunAndContinue } = useCtrlRunAndContinueMutation();

const dialogRun = ref(false);
const dialogRunInter = ref(false);

async function onRunConfirmed() {
  dialogRunInter.value = false;
  await executeRunAndContinue({});
}

async function onRunInterConfirmed() {
  dialogRunInter.value = false;
  await executeExec({});
}

onBeforeUnmount(() => {
  dialogRun.value = false;
  dialogRunInter.value = false;
});
</script>
