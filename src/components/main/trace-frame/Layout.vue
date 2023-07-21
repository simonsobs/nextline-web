<template>
  <div style="height: 100%">
    <div
      v-if="nextlineState?.state == 'running' && traceIds"
      class="g-container"
    >
      <code-exec
        :traceId="traceId"
        v-for="traceId in traceIds.traceIds"
        :key="traceId"
      ></code-exec>
    </div>
    <script-editor v-else v-model="editing"></script-editor>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useStore } from "@/stores/main";

import CodeExec from "@/components/CodeExec/CodeExec.vue";
import ScriptEditor from "@/components/ScriptEditor.vue";

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
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
</style>
