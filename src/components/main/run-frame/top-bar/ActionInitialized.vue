<template>
  <v-btn
    variant="flat"
    prepend-icon="mdi-play"
    :disabled="editing"
    @click="showConfirmationDialog"
  >
    run interactively
  </v-btn>
  <v-dialog v-model="dialogRunInter" max-width="340">
    <run-inter-confirmation-dialog
      @confirm="onRunInterConfirmed"
      @cancel="dialogRunInter = false"
    >
    </run-inter-confirmation-dialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";

import { useStore } from "@/stores/main";

import {
  useExecMutation,
  useQStateQuery,
  useStateSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";
import RunInterConfirmationDialog from "./RunInterConfirmationDialog.vue";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();
const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const store = useStore();
const { modified: editing } = storeToRefs(store);


const { executeMutation: executeExec } = useExecMutation();

function showConfirmationDialog() {
  dialogRunInter.value = true;
}

async function onRunInterConfirmed() {
  dialogRunInter.value = false;
  await executeExec({});
}

watch(state, () => {
  if (state.value !== "initialized") {
    dialogRunInter.value = false;
  }
});

const dialogRunInter = ref(false);
</script>
