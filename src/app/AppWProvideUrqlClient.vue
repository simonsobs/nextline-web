<template>
  <app> </app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProvideClient } from "@/urql";
import { useConfigStore } from "@/stores/config";
import App from "./AppMain.vue";
const configStore = useConfigStore();
const graphqlUrl = computed(() => configStore.config?.apiHttp);
if (!graphqlUrl.value) throw new Error("No graphqlUrl");
useProvideClient(graphqlUrl.value);
</script>
