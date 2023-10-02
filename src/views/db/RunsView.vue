<template>
  <div class="g-container">
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="runNo"
      :loading="loading"
      :items-per-page="10"
      :hide-default-footer="false"
      :sort-by="sortBy"
      :sort-desc="true"
      @click:row="onClickRow"
    >
      <template v-slot:top>
        <v-alert v-if="error" variant="tonal" type="error">
          {{ error }}
        </v-alert>
        <refresh-button :disabled="loading" @refresh="refresh">
        </refresh-button>
      </template>
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
import type { UnwrapRef } from "vue";
import { useRouter } from "vue-router";
import { refThrottled } from "@vueuse/core";

import { useRunsQuery } from "@/graphql/codegen/generated";
import { useRefresh, useUnpack, useOverride } from "@/graphql/urql";

import { formatDateTime } from "./format";
import RefreshButton from "./RefreshButton.vue";

const queryResponse = useRunsQuery();
const unpacked = useUnpack(() => queryResponse.data?.value?.history.runs);

const { override, fetching, error, nodes } = useOverride(
  queryResponse,
  unpacked
);

const { refresh, refreshing } = useRefresh(queryResponse);
const loading = refThrottled(
  computed(() => fetching.value || refreshing.value),
  300
);

const router = useRouter();

const headers = ref([
  { title: "Run No.", key: "runNo" },
  { title: "State", key: "state" },
  { title: "Started at", key: "startedAt" },
  { title: "Ended at", key: "endedAt" },
  { title: "", key: "exception" },
]);

const sortBy = reactive([
  {
    key: "runNo",
    order: "desc" as const, // boolean | "asc" | "desc"
  },
]);

const items = computed(() =>
  nodes.value.map((n) => ({
    runNo: n.runNo,
    state: n.state,
    startedAt: formatDateTime(n.startedAt),
    endedAt: formatDateTime(n.endedAt),
    exception: !!n.exception,
    to: { name: "run", params: { runNo: n.runNo } },
  }))
);

type Item = UnwrapRef<(typeof items.value)[0]>;

function onClickRow(event: Event, value: { item: Item }) {
  router.push(value.item.to);
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
