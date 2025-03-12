<template>
  <div style="height: 100%">
    <div class="g-container">
      <template v-if="state == 'running' && traceIds">
        <TraceFrame
          v-for="traceId in traceIds"
          :key="traceId"
          :traceId="traceId"
        ></TraceFrame>
      </template>
      <ScriptEditor v-else></ScriptEditor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscribeState, useSubscribeTraceIds } from "@/api";

import ScriptEditor from "./script-editor/ScriptEditor.vue";
import TraceFrame from "./TraceFrame.vue";

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const traceIdsSubscription = useSubscribeTraceIds();
const { traceIds } = traceIdsSubscription;

await Promise.all([stateSubscription, traceIdsSubscription]);
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 6px;
}
</style>
