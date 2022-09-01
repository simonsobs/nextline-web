<template>
  <div style="height: 100%">
    <div v-if="nextlineState?.state == 'running' && traceIds" class="g-container">
      <code-exec
        :traceId="traceId"
        v-for="traceId in traceIds.traceIds"
        :key="traceId"
      ></code-exec>
    </div>
    <script-editor v-else v-model="editing"></script-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useSubscription } from "@urql/vue";

import { useStore } from "@/stores/index";

import CodeExec from "@/components/CodeExec/CodeExec.vue";
import ScriptEditor from "@/components/ScriptEditor.vue";

import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_TRACE_IDS from "@/graphql/subscriptions/TraceIds.gql";

export default defineComponent({
  name: "LayoutScript",
  components: {
    CodeExec,
    ScriptEditor,
  },
  setup() {
    const editing = ref(false);

    const stateSubscription = useSubscription<{ state: string }>({
      query: SUBSCRIBE_STATE,
    });

    const traceIdSubscription = useSubscription<{ traceIds: number[] }>({
      query: SUBSCRIBE_TRACE_IDS,
    });
    
    const store = useStore();
    
    watch(editing, (val) => {
      store.setModified(val);
    });

    return {
      editing,
      nextlineState: stateSubscription.data,
      traceIds: traceIdSubscription.data,
    };
  },
});
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
</style>
