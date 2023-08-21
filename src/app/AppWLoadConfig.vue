<template>
  <provide-urql-client v-if="!(loading || error)">
    <app> </app>
  </provide-urql-client>
  <div v-else-if="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import ProvideUrqlClient from "./ProvideUrqlClient.vue";
import App from "./AppMain.vue";
const { loading, error } = storeToRefs(useConfigStore());
</script>
