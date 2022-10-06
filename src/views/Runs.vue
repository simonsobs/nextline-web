<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col cols="10">
        <v-card outlined>
          <v-card-text v-if="history">
            <v-data-table
              :headers="headers"
              :items="history.runs.edges"
              item-key="node.runNo"
              :items-per-page="history.runs.edges.length"
              :hide-default-footer="true"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              show-expand
            >
              <template v-slot:[`item.node.runNo`]="{ item }">
                <span class="font-weight-bold primary--text">
                  {{ item.node.runNo }}
                </span>
              </template>
              <template v-slot:[`item.node.state`]="{ item }">
                <v-chip
                  :color="stateChipColor[item.node.state]"
                  class="text-capitalize"
                >
                  {{ item.node.state }}
                </v-chip>
              </template>
              <template v-slot:[`item.node.startedAt`]="{ item }">
                {{ formatDateTime(item.node.startedAt) }}
              </template>
              <template v-slot:[`item.node.endedAt`]="{ item }">
                {{ formatDateTime(item.node.endedAt) }}
              </template>
              <template v-slot:[`item.node.exception`]="{ item }">
                <v-icon v-if="!item.node.exception" color="teal"
                  >mdi-check</v-icon
                >
                <v-icon v-else color="red">mdi-close</v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <!-- <td :colspan="headers.length" style="width: 80%"> -->
                <td :colspan="headers.length">
                  <div>
                    <!-- <div style="width: 90%; overflow-x: auto"> -->
                    <pre>{{ item.node.script }}</pre>
                    <pre>{{ item.node.exception }}</pre>
                  </div>
                </td>
              </template>
            </v-data-table>
            <!-- <pre> {{ runs }} </pre> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useRunsQuery } from "@/gql/graphql";

const query = useRunsQuery();
const history = computed(() => query.data?.value?.history);

const headers = ref([
  { text: "Run No.", value: "node.runNo" },
  { text: "State", value: "node.state" },
  { text: "Started at", value: "node.startedAt" },
  { text: "Ended at", value: "node.endedAt" },
  { text: "", value: "node.exception" },
  { text: "", value: "data-table-expand" },
]);

const expanded = ref([]);
const singleExpand = ref(false);

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
