<template>
  <VCard flat class="g-card overflow-auto" height="100%" rounded="lg">
    <div class="g-head">
      <VCardTitle>
        Run: {{ run.runNo }}
        ⋅
        <span class="text-capitalize text-primary"> {{ run.state }} </span>
      </VCardTitle>
      <VCardText class="text-body-1">
        Started at:
        <span class="font-weight-bold"> {{ formatDateTime(run.startedAt || "") }} </span
        ><br />
        <span>
          Ended at:
          <span class="font-weight-bold">
            {{ formatDateTime(run.endedAt || "") }}
          </span>
        </span>
      </VCardText>
    </div>
    <div class="g-exception">
      <VCardSubtitle v-if="run.exception" class="font-weight-bold error--text">
        Uncaught exception:
      </VCardSubtitle>
      <VCardText v-if="run.exception">
        <VAlert type="error" variant="tonal">
          <pre v-text="run.exception" class="overflow-x-auto"></pre>
        </VAlert>
      </VCardText>
    </div>
    <div class="g-script">
      <VCardSubtitle class="font-weight-bold"> Script </VCardSubtitle>
      <VCardText style="height: 100%">
        <AsyncEditor :source="run?.script" v-if="run?.script"></AsyncEditor>
      </VCardText>
    </div>
    <div class="g-stdout">
      <VCardSubtitle class="font-weight-bold"> Stdout </VCardSubtitle>
      <VCardText class="stdout-text">
        <pre v-text="stdoutText" class="overflow-x-auto"></pre>
      </VCardText>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

import { RdbRunQuery } from "@/graphql/codegen/generated";

import AsyncEditor from "./AsyncEditor.vue";

type Run = NonNullable<RdbRunQuery["rdb"]["run"]>;

interface Props {
  run: Run;
}

const props = defineProps<Props>();

const { run } = toRefs(props);

const stdouts = computed(() => run.value?.stdouts || []);
const stdoutText = computed(() => stdouts.value.edges.map((e) => e.node.text).join(""));

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
.g-card {
  display: grid;
  height: 100%;
  grid-template-columns: minmax(100px, 1fr);
  /* grid-template-rows: min-content max-content minmax(min-content, 1fr) min-content; */
  grid-template-rows: min-content max-content min-content min-content;
  grid-template-areas: "head" "exception" "script" "stdout";
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

.g-stdout {
  grid-area: stdout;
}

.stdout-text {
  background: rgb(var(--v-theme-surface-container-low));
  margin: 1rem;
  padding: 2px;
}

.code {
  height: 100%;
  max-height: 100%;
}
</style>
