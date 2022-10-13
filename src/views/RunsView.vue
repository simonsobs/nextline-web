<template>
  <div class="g-container">
    <v-card flat class="overflow-auto" rounded="lg" max-width="1200">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="nodes"
          item-key="runNo"
          :items-per-page="10"
          :hide-default-footer="false"
          sort-by="runNo"
          :sort-desc="true"
          @click:row="onClickRow"
        >
          <template v-slot:item.runNo="{ item }">
            <span class="font-weight-bold primary--text">
              {{ item.runNo }}
            </span>
          </template>
          <template v-slot:item.state="{ item }">
            <v-chip :color="stateChipColor[item.state]" class="text-capitalize">
              {{ item.state }}
            </v-chip>
          </template>
          <template v-slot:item.startedAt="{ item }">
            {{ formatDateTime(item.startedAt) }}
          </template>
          <template v-slot:item.endedAt="{ item }">
            {{ formatDateTime(item.endedAt) }}
          </template>
          <template v-slot:item.exception="{ item }">
            <v-icon v-if="!item.exception" color="teal"> mdi-check </v-icon>
            <v-icon v-else color="red">mdi-close</v-icon>
          </template>
        </v-data-table>
        <!-- <pre> {{ runs }} </pre> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router/composables";

import { useRunsQuery } from "@/gql/graphql";

const router = useRouter();
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

const headers = ref([
  { text: "Run No.", value: "runNo" },
  { text: "State", value: "state" },
  { text: "Started at", value: "startedAt" },
  { text: "Ended at", value: "endedAt" },
  { text: "", value: "exception" },
]);

function onClickRow(item: any) {
  router.push({ name: "run", params: { runNo: item.runNo } });
}

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

<style>
/* .v-data-table {
  width: 100%;
}

tbody {
  width: 100%;
}

.v-data-table__wrapper {
  width: 100%;
  overflow-x: hidden !important;
} */
</style>

<style scoped>
.g-container {
  display: grid;
  margin: 12px;
  height: calc(100% - 2 * 12px);
  width: calc(100% - 2 * 12px);
  justify-content: center;
  grid-template-columns: minmax(min-content, 80%);
}
</style>
