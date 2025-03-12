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
import { storeToRefs } from "pinia";

import { useCtrlResetMutation } from "@/graphql/codegen/generated";
import { useStore } from "@/plugins/pinia/stores/main";
const store = useStore();
const { modified: editing } = storeToRefs(store);
const { executeMutation: executeReset } = useCtrlResetMutation();
</script>
