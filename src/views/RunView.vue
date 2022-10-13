<template>
  <div class="g-container">
    <v-breadcrumbs :items="breadcrumb" class="g-breadcrumbs"> </v-breadcrumbs>
    <v-card
      v-if="run"
      flat
      class="g-card overflow-auto"
      height="100%"
      rounded="lg"
    >
      <div class="g-head">
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
      </div>
      <div class="g-exception">
        <v-card-subtitle
          v-if="run.exception"
          class="font-weight-bold error--text"
        >
          Uncaught exception:
        </v-card-subtitle>
        <v-card-text v-if="run.exception">
          <v-alert outlined type="error" class="overflow-x-auto">
            {{ run.exception }}
          </v-alert>
        </v-card-text>
      </div>
      <div class="g-script">
        <v-card-subtitle class="font-weight-bold"> Script </v-card-subtitle>
        <v-card-text>
          <div class="code" ref="refEditor"></div>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router/composables";
import * as monaco from "monaco-editor";

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

const refEditor = ref<HTMLElement | null>(null);

const model = monaco.editor.createModel("", "python");

watch(
  run,
  (val) => {
    model.setValue(val?.script || "");
  },
  { immediate: true }
);

let editor: monaco.editor.IStandaloneCodeEditor | undefined;

watch(
  refEditor,
  (val) => {
    if (!val) return;
    editor = monaco.editor.create(val, {
      model,
      minimap: { enabled: false },
      scrollbar: {
        vertical: "hidden",
        horizontal: "auto",
        alwaysConsumeMouseWheel: false,
      },
      fontFamily: "Fira Code",
      fontSize: 14,
      fontWeight: "500",
      fontLigatures: true,
      lineHeight: 24,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      glyphMargin: true,
      readOnly: true,
      matchBrackets: "never",
      selectionHighlight: false,
      occurrencesHighlight: false,
      renderLineHighlight: "none",
      theme: "nextline-viewer",
    });
    val.style.height = `${editor.getContentHeight()}px`;
  },
  { immediate: true }
);
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
  grid-template-areas: "breadcrumbs" "card";
}

.g-breadcrumbs {
  grid-area: breadcrumbs;
}

.g-card {
  grid-area: card;
  display: grid;
  height: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content max-content minmax(min-content, 1fr);
  grid-template-areas: "head" "exception" "script";
}

.g-head {
  grid-area: head;
}

.g-exception {
  grid-area: exception;
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content 1fr;
}

.g-script {
  grid-area: script;
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(200px, 1fr);
}

.code {
  height: 100%;
  max-height: 100%;
}
</style>
