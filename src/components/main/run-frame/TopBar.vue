<template>
  <v-card flat>
    <v-card-actions>
      <span>
        Run: <span class="font-weight-medium"> {{ runNo }} </span>
      </span>
      <span class="text-capitalize text-primary font-weight-bold mx-3">
        {{ nextlineState }}
      </span>
      <template v-if="!autoMode && nextlineState === 'initialized'">
        <v-btn
          variant="flat"
          prepend-icon="mdi-play"
          :disabled="editing"
          @click="showConfirmationDialog"
        >
          start
        </v-btn>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-restore"
          :disabled="editing"
          @click="executeReset"
        >
          reset
        </v-btn>
      </template>
      <template v-else-if="nextlineState === 'running'">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-close"
          @click="executeInterrupt"
        >
          interrupt
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon> mdi-dots-horizontal</v-icon>
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
      <template v-else-if="!autoMode && nextlineState === 'finished'">
        <v-btn variant="flat" prepend-icon="mdi-restore" @click="executeReset">
          reset
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
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
  useStateSubscription,
  useRunNoSubscription,
} from "@/gql/graphql";
import { storeToRefs } from "pinia";
import RunConfirmationDialog from "./RunConfirmationDialog.vue";

const stateSubscription = useStateSubscription();
const nextlineState = computed(
  () => stateSubscription.data?.value?.state || "unknown"
);

const runNoSubscription = useRunNoSubscription();
const runNo = computed(() => runNoSubscription.data?.value?.runNo);

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

watch(nextlineState, () => {
  if (nextlineState.value !== "initialized") {
    dialog.value = false;
  }
});

const dialog = ref(false);
</script>
