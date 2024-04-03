<template>
  <div class="g-container">
    <div class="g-breadcrumb">
      <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
    </div>
    <v-data-table-server
      :headers="headers"
      :items="items"
      :loading="loading"
      :page="page"
      :items-length="totalCount"
      :items-per-page="itemsPerPage"
      :hide-default-footer="false"
      @click:row="onClickRow"
      @update:items-per-page="onUpdateItemsPerPage"
      @update:page="onUpdatePage"
      class="g-table"
    >
      <template v-slot:top>
        <v-alert v-if="error" variant="tonal" type="error">
          {{ error }}
        </v-alert>
        <refresh-button :disabled="loading" @refresh="resetQueryVariables">
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
    </v-data-table-server>
    <dev-tool-checkboxes
      top="20px"
      right="5px"
      v-model="override"
    ></dev-tool-checkboxes>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { refThrottled, until } from "@vueuse/core";

import { useRdbRunsQuery } from "@/graphql/codegen/generated";
import type { RdbRunsQueryVariables } from "@/graphql/codegen/generated";
import { useRefresh, useUnpack, useOverride } from "@/graphql/urql";

import { formatDateTime } from "./format";
import RefreshButton from "./RefreshButton.vue";

const breadcrumb = [{ title: "Runs", disabled: false}];

const initialPage = 1;
const initialItemsPerPage = 10;

const page = ref(initialPage);
const itemsPerPage = ref(initialItemsPerPage);

const initialQueryVariables: RdbRunsQueryVariables = {
  before: undefined,
  after: undefined,
  first: itemsPerPage.value,
  last: undefined,
};

const reactiveQueryVariables = ref(initialQueryVariables);

const queryVariables: RdbRunsQueryVariables = { ...initialQueryVariables };

const queryOptions = {
  variables: queryVariables,
  requestPolicy: "network-only" as const,
};

const queryResponse = useRdbRunsQuery(queryOptions);

const unpacked = useUnpack(() => queryResponse.data?.value?.rdb.runs);

const totalCount = computed(() => unpacked.connection.value?.totalCount || 0);

const pageInfo = computed(() => unpacked.connection.value?.pageInfo);

const { override, fetching, error, nodes } = useOverride(queryResponse, unpacked);

const { refresh, refreshing } = useRefresh(queryResponse);
const loading = refThrottled(
  computed(() => fetching.value || refreshing.value),
  300
);
// const loading = computed(() => fetching.value);

async function resetQueryVariables() {
  if (
    JSON.stringify(page.value) === JSON.stringify(initialPage) &&
    itemsPerPage.value === initialItemsPerPage
  ) {
    await refresh();
  } else {
    page.value = initialPage;
    itemsPerPage.value = initialItemsPerPage;
    // refresh() will be called as they are reactive
  }
}

watch(itemsPerPage, () => {
  // Move to the first page when itemsPerPage changes as it is easier to
  // implement quickly. It is quite complicated to keep the current page
  // because v-data-table-server triggers the update:page event.
  reactiveQueryVariables.value = {
    first: itemsPerPage.value,
    after: undefined,
    last: undefined,
    before: undefined,
  };
});

watch(page, (newPage, oldPage) => {
  if (pageInfo.value === undefined) return;
  if (newPage > oldPage) {
    if (!pageInfo.value.hasNextPage) return;
    if (newPage === oldPage + 1) {
      reactiveQueryVariables.value = {
        first: itemsPerPage.value,
        after: pageInfo.value.endCursor,
        last: undefined,
        before: undefined,
      };
    } else {
      // To the last page
      reactiveQueryVariables.value = {
        first: undefined,
        after: undefined,
        last: itemsPerPage.value,
        before: undefined,
      };
    }
  } else {
    if (!pageInfo.value.hasPreviousPage) return;
    if (newPage === oldPage - 1) {
      reactiveQueryVariables.value = {
        last: itemsPerPage.value,
        before: pageInfo.value.startCursor,
        first: undefined,
        after: undefined,
      };
    } else {
      // To the first page
      reactiveQueryVariables.value = {
        first: itemsPerPage.value,
        after: undefined,
        last: undefined,
        before: undefined,
      };
    }
  }
});

watch(reactiveQueryVariables, async () => {
  Object.assign(queryVariables, reactiveQueryVariables.value);
  await refresh();
});

const headers = ref([
  { title: "Run No.", key: "runNo" },
  { title: "State", key: "state" },
  { title: "Started at", key: "startedAt" },
  { title: "Ended at", key: "endedAt" },
  { title: "", key: "exception" },
]);

function nodeToItem(n: (typeof nodes.value)[0]) {
  return {
    runNo: n.runNo,
    state: n.state,
    startedAt: formatDateTime(n.startedAt),
    endedAt: formatDateTime(n.endedAt),
    exception: !!n.exception,
    to: { name: "run", params: { runNo: n.runNo } },
  };
}

type Item = ReturnType<typeof nodeToItem>;

const items = computed(() => nodes.value.map(nodeToItem));

const router = useRouter();

function onClickRow(event: Event, value: { item: Item }) {
  router.push(value.item.to);
}

async function onUpdateItemsPerPage(itemsPerPage_: number) {
  itemsPerPage.value = itemsPerPage_;
  if (!loading.value) await until(loading).toBeTruthy();
  await until(loading).toBe(false);
}

async function onUpdatePage(page_: number) {
  page.value = page_;
  if (!loading.value) await until(loading).toBeTruthy();
  await until(loading).toBe(false);
}
</script>
<style scoped>
.g-container {
  position: relative;
  display: grid;
  padding: 12px;
  justify-content: center;
  grid-template-columns: minmax(100px, 960px);
  grid-template-rows: min-content 1fr;
  grid-template-areas: "breadcrumb" "table";
}

.g-breadcrumb {
  grid-area:  breadcrumb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-table {
  grid-area: table;
}
</style>
