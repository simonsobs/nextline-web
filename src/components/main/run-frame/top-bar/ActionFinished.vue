<template>
  <v-btn
    variant="flat"
    prepend-icon="mdi-restore"
    :disabled="editing"
    @click="executeReset"
  >
    reset
  </v-btn>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/main";
import { useResetMutation } from "@/gql/graphql";
import { storeToRefs } from "pinia";
const store = useStore();
const { modified: editing } = storeToRefs(store);
const { executeMutation: executeReset } = useResetMutation();
</script>
