<template>
  <div style="height: 100%">
    <div v-if="nextlineState == 'running'" class="g-container">
      <code-exec
        :traceId="traceId"
        v-for="traceId in traceIds"
        :key="traceId"
      ></code-exec>
    </div>
    <script-editor v-else v-model="editing"></script-editor>
  </div>
</template>

<script>
import { mapStores } from "pinia";

import { useStore } from "@/stores/index";

import CodeExec from "@/components/CodeExec/CodeExec.vue";
import ScriptEditor from "@/components/ScriptEditor.vue";

import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";
import SUBSCRIBE_TRACE_IDS from "@/graphql/subscriptions/TraceIds.gql";

export default {
  name: "LayoutScript",
  components: {
    CodeExec,
    ScriptEditor,
  },
  data() {
    return {
      editing: false,
      tab: null,
      nextlineState: null,
      traceIds: [],
    };
  },
  computed: {
    ...mapStores(useStore),
  },
  apollo: {
    $subscribe: {
      nextlineState: {
        query: SUBSCRIBE_STATE,
        result({ data }) {
          this.nextlineState = data.state;
        },
      },
      traceIds: {
        query: SUBSCRIBE_TRACE_IDS,
        result({ data }) {
          this.traceIds = data.traceIds;
        },
      },
    },
  },
  watch: {
    editing(val) {
      this.mainStore.setModified(val);
    },
  },
};
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
</style>
