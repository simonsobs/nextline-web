<template>
  <div style="height: 100%">
    <div class="g-container">
      <template v-if="state == 'running' && traceIds">
        <trace-frame
          :traceId="traceId"
          v-for="traceId in traceIds"
          :key="traceId"
        ></trace-frame>
      </template>
      <script-editor v-else></script-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import TraceFrame from "./TraceFrame.vue";
import ScriptEditor from "./script-editor/ScriptEditor.vue";

import { useSubscribeState, useSubscribeTraceIds } from "@/api";

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
