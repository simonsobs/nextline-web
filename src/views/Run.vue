<template>
  <div class="g-container">
    <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
    <v-card v-if="run" flat class="overflow-auto" rounded="lg">
      <v-card-title>
        Run: {{ run.runNo }}
        <v-chip
          v-if="run.state"
          :color="stateChipColor[run.state]"
          class="text-capitalize ml-5"
        >
          {{ run.state }}
        </v-chip>
      </v-card-title>
      <v-card-text class="text-body-1">
        Started at:
        <span class="font-weight-bold">
          {{ formatDateTime(run.startedAt) }} </span
        ><br />
        <span>
          Ended at:
          <span class="font-weight-bold">
            {{ formatDateTime(run.endedAt) }}
          </span>
        </span>
      </v-card-text>
      <v-card-subtitle v-if="run.exception" class="font-weight-bold error--text"> 
      Uncaught exception:
      </v-card-subtitle>
      <v-card-text v-if="run.exception">
        <v-alert outlined type="error">
          {{ run.exception }}
        </v-alert>
      </v-card-text>
      <v-card-subtitle class="font-weight-bold"> Script </v-card-subtitle>
      <v-card-text>
        <pre>{{ run.script }}</pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router/composables";

import { useRunsQuery } from "@/gql/graphql";

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

const stateChipColor = ref({
  initialized: "success",
  running: "primary",
  exited: "warning",
  finished: "warning",
  closed: "warning",
});

function formatDateTime(dateTime: string) {
  if (!dateTime) return;
  const sinceEpoch = Date.parse(dateTime);
  const format = Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
  return format.format(sinceEpoch);
}
</script>

<style scoped>
.g-container {
  display: grid;
  margin: 12px;
  height: calc(100% - 2 * 12px);
  width: calc(100% - 2 * 12px);
  justify-content: center;
  grid-template-columns: minmax(min-content, 80%);
  grid-template-rows: min-content 1fr;
}
</style>
