<template>
  <div style="height: 100%">
    <div class="g-container">
      <template v-if="nextlineState?.state == 'running' && traceIds">
        <code-exec
          :traceId="traceId"
          v-for="traceId in traceIds.traceIds"
          :key="traceId"
        ></code-exec>
      </template>
      <script-editor v-else v-model="editing"></script-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useStore } from "@/stores/main";

import CodeExec from "./CodeExec.vue";
import ScriptEditor from "./ScriptEditor.vue";

import { useStateSubscription, useTraceIdsSubscription } from "@/gql/graphql";

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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
</style>
