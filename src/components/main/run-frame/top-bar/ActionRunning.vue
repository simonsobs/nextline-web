<template>
  <VSpacer></VSpacer>
  <Component :is="menuComponent" v-bind="menuAttributes">
    <template #activator="{ props }">
      <VBtn variant="text" v-bind="props" icon="mdi-dots-horizontal" density="compact">
      </VBtn>
    </template>
    <VList>
      <VListItem class="text-error" @click="dialogInterrupt = true">
        <template #prepend>
          <VIcon> mdi-close </VIcon>
        </template>
        Interrupt
      </VListItem>
      <VListItem class="text-error" @click="dialogTerminate = true">
        <template #prepend>
          <VIcon> mdi-close-octagon-outline </VIcon>
        </template>
        Terminate
      </VListItem>
      <VListItem class="text-error" @click="dialogKill = true">
        <template #prepend>
          <VIcon> mdi-close-octagon </VIcon>
        </template>
        Kill
      </VListItem>
    </VList>
  </Component>
  <VDialog v-model="dialogInterrupt" max-width="400">
    <InterruptConfirmationDialog
      @confirm="onInterruptConfirmed"
      @cancel="dialogInterrupt = false"
    >
    </InterruptConfirmationDialog>
  </VDialog>
  <VDialog v-model="dialogTerminate" max-width="400">
    <TerminateConfirmationDialog
      @confirm="onTerminateConfirmed"
      @cancel="dialogTerminate = false"
    >
    </TerminateConfirmationDialog>
  </VDialog>
  <VDialog v-model="dialogKill" max-width="400">
    <KillConfirmationDialog @confirm="onKillConfirmed" @cancel="dialogKill = false">
    </KillConfirmationDialog>
  </VDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { VBottomSheet } from "vuetify/components/VBottomSheet";
import { VMenu } from "vuetify/components/VMenu";

import {
  useCtrlInterruptMutation,
  useCtrlTerminateMutation,
  useCtrlKillMutation,
} from "@/graphql/codegen/generated";

import InterruptConfirmationDialog from "./InterruptConfirmationDialog.vue";
import KillConfirmationDialog from "./KillConfirmationDialog.vue";
import TerminateConfirmationDialog from "./TerminateConfirmationDialog.vue";

const { executeMutation: executeInterrupt } = useCtrlInterruptMutation();
const { executeMutation: executeTerminate } = useCtrlTerminateMutation();
const { executeMutation: executeKill } = useCtrlKillMutation();

const { mobile } = useDisplay();

const menuComponent = computed(() => (mobile.value ? VBottomSheet : VMenu));
const menuAttributes = computed(() =>
  mobile.value ? {} : { location: "top" as const, offset: 8 },
);

const dialogInterrupt = ref(false);
const dialogTerminate = ref(false);
const dialogKill = ref(false);

async function onInterruptConfirmed() {
  dialogInterrupt.value = false;
  await executeInterrupt({});
}

async function onTerminateConfirmed() {
  dialogTerminate.value = false;
  await executeTerminate({});
}

async function onKillConfirmed() {
  dialogKill.value = false;
  await executeKill({});
}
</script>
