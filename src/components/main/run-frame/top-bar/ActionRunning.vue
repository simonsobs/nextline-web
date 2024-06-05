<template>
  <VSpacer></VSpacer>
  <VBtn
    variant="outlined"
    color="error"
    prepend-icon="mdi-close"
    @click="executeInterrupt"
  >
    interrupt
  </VBtn>
  <Component :is="menuComponent" v-bind="menuAttributes">
    <template #activator="{ props }">
      <VBtn variant="text" v-bind="props" icon="mdi-dots-horizontal" density="compact">
      </VBtn>
    </template>
    <VList>
      <VListItem @click="executeTerminate({})" class="text-error">
        <template #prepend>
          <VIcon> mdi-close-octagon-outline </VIcon>
        </template>
        Terminate
      </VListItem>
      <VListItem @click="executeKill({})" class="text-error">
        <template #prepend>
          <VIcon> mdi-close-octagon </VIcon>
        </template>
        Kill
      </VListItem>
    </VList>
  </Component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import {
  useCtrlInterruptMutation,
  useCtrlTerminateMutation,
  useCtrlKillMutation,
} from "@/graphql/codegen/generated";

const { executeMutation: executeInterrupt } = useCtrlInterruptMutation();
const { executeMutation: executeTerminate } = useCtrlTerminateMutation();
const { executeMutation: executeKill } = useCtrlKillMutation();

const { mobile } = useDisplay();

const menuComponent = computed(() => (mobile.value ? "VBottomSheet" : "VMenu"));
const menuAttributes = computed(() =>
  mobile.value ? {} : { location: "top", offset: 8 }
);
</script>
