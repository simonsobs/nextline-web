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
  <VMenu offset-y>
    <template v-slot:activator="{ props }">
      <VBtn variant="text" v-bind="props" icon="mdi-dots-horizontal" density="compact">
      </VBtn>
    </template>
    <VList>
      <VListItem @click="executeTerminate({})" class="text-error">
        <template v-slot:prepend>
          <VIcon> mdi-close-octagon-outline </VIcon>
        </template>
        Terminate
      </VListItem>
      <VListItem @click="executeKill({})" class="text-error">
        <template v-slot:prepend>
          <VIcon> mdi-close-octagon </VIcon>
        </template>
        Kill
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import {
  useCtrlInterruptMutation,
  useCtrlTerminateMutation,
  useCtrlKillMutation,
} from "@/graphql/codegen/generated";

const { executeMutation: executeInterrupt } = useCtrlInterruptMutation();
const { executeMutation: executeTerminate } = useCtrlTerminateMutation();
const { executeMutation: executeKill } = useCtrlKillMutation();
</script>
