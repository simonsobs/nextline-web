<template>
  <v-btn
    variant="flat"
    prepend-icon="mdi-play"
    :disabled="editing"
    @click="showConfirmationDialog"
  >
    start
  </v-btn>
  <v-dialog v-model="dialog" max-width="290">
    <run-confirmation-dialog
      @confirm="onStartConfirmed"
      @cancel="dialog = false"
    >
    </run-confirmation-dialog>
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
import RunConfirmationDialog from "./RunConfirmationDialog.vue";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();
const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const store = useStore();
const { modified: editing } = storeToRefs(store);


const { executeMutation: executeExec } = useExecMutation();

function showConfirmationDialog() {
  dialog.value = true;
}

async function onStartConfirmed() {
  dialog.value = false;
  await executeExec({});
}

watch(state, () => {
  if (state.value !== "initialized") {
    dialog.value = false;
  }
});

const dialog = ref(false);
</script>
