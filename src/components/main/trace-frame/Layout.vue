<template>
  <div style="height: 100%">
    <div class="g-container">
      <template v-if="nextlineState?.state == 'running' && traceIds">
        <trace-frame
          :traceId="traceId"
          v-for="traceId in traceIds.traceIds"
          :key="traceId"
        ></trace-frame>
      </template>
      <script-editor v-else v-model="editing"></script-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useStore } from "@/plugins/pinia/stores/main";

import TraceFrame from "./TraceFrame.vue";
import ScriptEditor from "./script-editor/ScriptEditor.vue";

import {
  useStateSubscription,
  useTraceIdsSubscription,
} from "@/graphql/codegen/generated";

const editing = ref(false);

const stateSubscription = useStateSubscription();

const traceIdSubscription = useTraceIdsSubscription();

const store = useStore();

watch(editing, (val) => {
  store.setModified(val);
});

const nextlineState = computed(() => stateSubscription.data.value);
const traceIds = computed(() => traceIdSubscription.data.value);
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
