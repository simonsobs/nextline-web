<template>
  <Component :is="menuComponent">
    <template #activator="{ props }">
      <VBtn v-bind="props" variant="tonal" color="tertiary">
        <slot v-if="!mobile">Auto Mode: </slot>{{ mode }}
        <template #append v-if="pulling">
          <VProgressCircular indeterminate size="16" width="2" class="ml-1">
          </VProgressCircular>
        </template>
      </VBtn>
    </template>
    <div>
      <DialogScheduler v-if="mode === 'scheduler'" class="dialog"></DialogScheduler>
      <DialogQueue v-else-if="mode === 'queue'" class="dialog"></DialogQueue>
      <VCard v-else><VAlert type="error" variant="tonal">Unknown Mode</VAlert></VCard>
    </div>
  </Component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { VBottomSheet } from "vuetify/components/VBottomSheet";
import { VMenu } from "vuetify/components/VMenu";

import { useSubscribeScheduleAutoModeMode } from "@/api";

import { useAutoMode } from "../../use-auto-mode";
import DialogScheduler from "./scheduler/Dialog.vue";
import DialogQueue from "./queue/Dialog.vue";

const { mobile } = useDisplay();
const menuComponent = computed(() => (mobile.value ? VBottomSheet : VMenu));

const { data: mode, then: then1 } = useSubscribeScheduleAutoModeMode();
const { pulling, then: then2 } = useAutoMode();
await Promise.all([then1(), then2()]);
</script>

<style scoped>
.v-bottom-sheet .dialog {
  border-radius: 0 !important;
  padding: 4px 4px 24px 4px;
}

.v-menu .dialog {
  width: 290px;
  padding: 4px;
}
</style>
