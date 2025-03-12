<template>
  <VSpacer></VSpacer>
  <VBtn
    v-if="!mobile"
    variant="outlined"
    :disabled="editing"
    @click="dialogRunInter = true"
  >
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
  <VBottomSheet v-if="mobile">
    <template #activator="{ props }">
      <VBtn
        variant="text"
        v-bind="props"
        icon="mdi-dots-horizontal"
        density="compact"
        class="ml-2"
      >
      </VBtn>
    </template>
    <VList>
      <VListItem @click="dialogRunInter = true">
        <template #prepend>
          <VIcon> mdi-skip-next </VIcon>
        </template>
        Run Interactively
      </VListItem>
    </VList>
  </VBottomSheet>
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
import { useDisplay } from "vuetify";

import {
  useCtrlExecMutation,
  useCtrlRunAndContinueMutation,
} from "@/graphql/codegen/generated";
import { useStore } from "@/plugins/pinia/stores/main";

import RunConfirmationDialog from "./RunConfirmationDialog.vue";
import RunInterConfirmationDialog from "./RunInterConfirmationDialog.vue";

const { mobile } = useDisplay();

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
