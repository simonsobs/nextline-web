<template>
  <div class="g-container">
    <v-data-table
      :headers="headers"
      :items="nodes"
      item-key="runNo"
      :items-per-page="10"
      :hide-default-footer="false"
      :sort-by="sortBy"
      :sort-desc="true"
      @click:row="onClickRow"
    >
      <template v-slot:item.runNo="{ item }">
        <span class="font-weight-bold primary--text">
          {{ item.runNo }}
        </span>
      </template>
      <template v-slot:item.state="{ item }">
        <span class="text-capitalize text-primary font-weight-bold">
          {{ item.state }}
        </span>
      </template>
      <template v-slot:item.startedAt="{ item }">
        {{ formatDateTime(item.startedAt) }}
      </template>
      <template v-slot:item.endedAt="{ item }">
        {{ formatDateTime(item.endedAt) }}
      </template>
      <template v-slot:item.exception="{ item }">
        <v-icon v-if="!item.exception" color="primary"> mdi-check </v-icon>
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
    </v-data-table>
    <dev-tool-checkboxes top="20px" right="-5px" v-model="override">
    </dev-tool-checkboxes>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { VDataTable } from "vuetify/labs/VDataTable";

import { useRunsQuery } from "@/graphql/codegen/generated";

const override = ref({});

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
  { title: "Run No.", key: "runNo" },
  { title: "State", key: "state" },
  { title: "Started at", key: "startedAt" },
  { title: "Ended at", key: "endedAt" },
  { title: "", key: "exception" },
]);

function onClickRow(event: Event, item: any) {
  router.push({ name: "run", params: { runNo: item.item.runNo } });
}

const sortBy = reactive([
  {
    key: "runNo",
    order: "desc", // boolean | "asc" | "desc"
  },
]);

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
  position: relative;
  max-width: 960px;
  margin: auto;
  padding: 20px 20px 64px 20px;
}
</style>
