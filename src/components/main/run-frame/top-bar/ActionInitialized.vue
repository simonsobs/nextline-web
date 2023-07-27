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
  <v-dialog v-model="dialogRunInter" max-width="340">
    <run-inter-confirmation-dialog
      @confirm="onRunInterConfirmed"
      @cancel="dialogRunInter = false"
    >
    </run-inter-confirmation-dialog>
  </v-dialog>
  <v-dialog v-model="dialogRun" max-width="340">
    <run-confirmation-dialog
      @confirm="onRunConfirmed"
      @cancel="dialogRun = false"
    >
    </run-confirmation-dialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";

import { useStore } from "@/stores/main";

import {
  useExecMutation,
  useRunAndContinueMutation,
  useQStateQuery,
  useStateSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";
import RunInterConfirmationDialog from "./RunInterConfirmationDialog.vue";
import RunConfirmationDialog from "./RunConfirmationDialog.vue";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();
const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const store = useStore();
const { modified: editing } = storeToRefs(store);

const { executeMutation: executeExec } = useExecMutation();
const { executeMutation: executeRunAndContinue } = useRunAndContinueMutation();

async function onRunConfirmed() {
  dialogRunInter.value = false;
  await executeRunAndContinue({});
}

async function onRunInterConfirmed() {
  dialogRunInter.value = false;
  await executeExec({});
}

watch(state, () => {
  if (state.value !== "initialized") {
    dialogRun.value = false;
    dialogRunInter.value = false;
  }
});

const dialogRun = ref(false);
const dialogRunInter = ref(false);
</script>
