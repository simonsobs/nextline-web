<template>
  <div v-if="error">{{ error }}</div>
  <div v-else-if="loading"></div>
  <provide-urql-client v-else>
    <app> </app>
  </provide-urql-client>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import ProvideUrqlClient from "./ProvideUrqlClient.vue";
import App from "./AppMain.vue";
const { loading, error } = storeToRefs(useConfigStore());
</script>
