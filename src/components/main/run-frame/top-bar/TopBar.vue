<template>
  <div>
    <v-card-actions id="main">
      <span-run-no-state></span-run-no-state>
      <v-spacer></v-spacer>
      <template v-if="!autoMode && state === 'initialized'">
        <v-btn
          variant="flat"
          prepend-icon="mdi-play"
          :disabled="editing"
          @click="showConfirmationDialog"
        >
          start
        </v-btn>
      </template>
      <template v-else-if="state === 'running'">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-close"
          @click="executeInterrupt"
        >
          interrupt
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-horizontal" density="compact">
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="executeTerminate({})">
              <template v-slot:prepend>
                <v-icon> mdi-close-octagon-outline </v-icon>
              </template>
              terminate
            </v-list-item>
            <v-list-item @click="executeKill({})">
              <template v-slot:prepend>
                <v-icon> mdi-close-octagon </v-icon>
              </template>
              kill
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else-if="!autoMode && state === 'finished'">
        <v-btn
          variant="flat"
          prepend-icon="mdi-restore"
          :disabled="editing"
          @click="executeReset"
        >
          reset
        </v-btn>
      </template>
    </v-card-actions>
  </div>
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
import { useScheduleStore } from "@/stores/schedule";

import {
  useResetMutation,
  useExecMutation,
  useInterruptMutation,
  useTerminateMutation,
  useKillMutation,
  useQStateQuery,
  useStateSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";
import RunConfirmationDialog from "./RunConfirmationDialog.vue";
import SpanRunNoState from "./SpanRunNoState.vue";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();
const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const store = useStore();
const { modified: editing } = storeToRefs(store);

const scheduleStore = useScheduleStore();
const { autoMode } = storeToRefs(scheduleStore);

const { executeMutation: executeExec } = useExecMutation();
const { executeMutation: executeReset } = useResetMutation();
const { executeMutation: executeInterrupt } = useInterruptMutation();
const { executeMutation: executeTerminate } = useTerminateMutation();
const { executeMutation: executeKill } = useKillMutation();

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

<style scoped>
#main {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: center;
  column-gap: 4px;
  min-height: 0px; /* override v-card-actions */
}
</style>
