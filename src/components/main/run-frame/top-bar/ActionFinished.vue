<template>
  <VSpacer></VSpacer>
  <VBtn
    variant="flat"
    prepend-icon="mdi-restore"
    :disabled="editing"
    @click="executeReset"
  >
    reset
  </VBtn>
</template>

<script setup lang="ts">
import { useStore } from "@/plugins/pinia/stores/main";
import { useCtrlResetMutation } from "@/graphql/codegen/generated";
import { storeToRefs } from "pinia";
const store = useStore();
const { modified: editing } = storeToRefs(store);
const { executeMutation: executeReset } = useCtrlResetMutation();
</script>
