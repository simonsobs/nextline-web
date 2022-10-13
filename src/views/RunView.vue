<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router/composables";

import { useRunsQuery } from "@/gql/graphql";

import RunCard from "@/components/History/RunCard.vue";

const route = useRoute();
const runNo = Number(route.params.runNo);

const breadcrumb = computed(() => [
  { text: "Runs", to: { name: "runs" }, exact: true },
  { text: `Run ${runNo}`, to: { name: "run", params: { runNo } } },
]);

const query = useRunsQuery();

type Query = typeof query;

function readEdges(query: Query) {
  const edgesAndNulls = query.data.value?.history.runs.edges;
  if (!edgesAndNulls) return [];
  return edgesAndNulls.flatMap((e) => (e ? [e] : []));
}

function readNodes(query: Query) {
  return readEdges(query).flatMap((e) => (e.node ? e.node : []));
}

const nodes = computed(() => readNodes(query));
const run = computed(() => nodes.value.find((n) => n.runNo === runNo));
</script>

<template>
  <div class="g-container">
    <v-breadcrumbs :items="breadcrumb" class="g-breadcrumbs"> </v-breadcrumbs>
    <run-card v-if="run" class="g-card" :run="run"></run-card>
  </div>
</template>

<style scoped>
.g-container {
  display: grid;
  margin: 12px;
  height: calc(100% - 2 * 12px);
  width: calc(100% - 2 * 12px);
  justify-content: center;
  grid-template-columns: minmax(min-content, 80%);
  grid-template-rows: min-content 1fr;
  grid-template-areas: "breadcrumbs" "card";
}

.g-breadcrumbs {
  grid-area: breadcrumbs;
}

.g-card {
  grid-area: card;
}
</style>
