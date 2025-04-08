<template>
  <div class="g-container">
    <pre> {{ headers }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useDevHeadersQuery } from "@/graphql/codegen/generated";

const query = useDevHeadersQuery({ requestPolicy: "network-only", variables: {} });
const headers = computed(() => JSON.parse(query.data.value?.dev.headers ?? "null"));
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  place-items: center;
}

.g-container > div {
  text-align: center;
}
</style>
