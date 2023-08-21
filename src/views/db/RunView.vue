<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { useRunsQuery } from "@/graphql/codegen/generated";

import RunCard from "@/components/History/RunCard.vue";

const route = useRoute();
const runNo = Number(route.params.runNo);

const breadcrumb = computed(() => [
  { title: "Runs", to: { name: "runs" }, exact: true },
  { title: `Run ${runNo}`, to: { name: "run", params: { runNo } } },
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
const index = computed(() => nodes.value.findIndex((n) => n.runNo === runNo));
const run = computed(() => nodes.value[index.value]);
const toPrev = computed(() => {
  const prevIndex = index.value - 1;
  if (prevIndex < 0) return;
  return { name: "run", params: { runNo: nodes.value[prevIndex].runNo } };
});
const toNext = computed(() => {
  const nextIndex = index.value + 1;
  if (nextIndex >= nodes.value.length) return;
  return { name: "run", params: { runNo: nodes.value[nextIndex].runNo } };
});
</script>

<template>
  <div class="g-container">
    <div class="g-navi">
      <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      <span class="pr-6">
        <v-btn icon variant="plain" :to="toPrev" v-if="toPrev">
          <v-icon> mdi-arrow-left-bold </v-icon>
        </v-btn>
        <v-btn icon variant="plain" :to="toNext" v-if="toNext">
          <v-icon> mdi-arrow-right-bold </v-icon>
        </v-btn>
      </span>
    </div>
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
  grid-template-areas: "navi" "card";
}

.g-navi {
  grid-area: navi;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-card {
  grid-area: card;
}
</style>
