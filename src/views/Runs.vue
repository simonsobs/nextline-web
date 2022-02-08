<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col cols="10">
        <v-card outlined>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="runs"
              item-key="runNo"
              :items-per-page="runs.length"
              :hide-default-footer="true"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              show-expand
            >
              <template v-slot:[`item.startedAt`]="{ item }">
                <span class="text-no-wrap">
                {{ formatDateTime(item.startedAt) }}
                </span>
              </template>
              <template v-slot:[`item.endedAt`]="{ item }">
                <span class="text-no-wrap">
                {{ formatDateTime(item.endedAt) }}
                </span>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <pre>{{ item.script }}</pre>
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

<script>
import RUNS from "@/graphql/queries/Runs.gql";

export default {
  name: "Runs",
  data() {
    return {
      runs: [],
      headers: [
        { text: "Run No.", value: "runNo" },
        { text: "State", value: "state" },
        { text: "Started at", value: "startedAt" },
        { text: "Ended at", value: "endedAt" },
        { text: "", value: "data-table-expand" },
      ],
      expanded: [],
      singleExpand: false,
    };
  },
  apollo: {
    runs: {
      query: RUNS,
    },
  },
  methods: {
    formatDateTime(dateTime) {
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
    },
  },
};
</script>
