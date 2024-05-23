<template>
  <v-spacer></v-spacer>
  <v-btn variant="outlined" :disabled="editing" @click="dialogRunInter = true">
    run interactively
  </v-btn>
  <v-btn
    variant="flat"
    prepend-icon="mdi-play"
    :disabled="editing"
    @click="dialogRun = true"
  >
    run
  </v-btn>
  <v-dialog v-model="dialogRunInter" max-width="400">
    <run-inter-confirmation-dialog
      @confirm="onRunInterConfirmed"
      @cancel="dialogRunInter = false"
    >
    </run-inter-confirmation-dialog>
  </v-dialog>
  <v-dialog v-model="dialogRun" max-width="400">
    <run-confirmation-dialog @confirm="onRunConfirmed" @cancel="dialogRun = false">
    </run-confirmation-dialog>
  </v-dialog>
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
