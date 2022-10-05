<template>
  <app v-if="!(loading || error)"> </app>
  <div v-else-if="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import App from "./App.vue";
const { loading, error } = storeToRefs(useConfigStore());
</script>
