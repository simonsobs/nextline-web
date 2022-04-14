<template>
  <div class="fill-height">
    <div
      v-if="nextlineState == 'running'"
      class="fill-height align-stretch pa-0"
    >
      <div v-if="layout == 'grid'" class="g-grid-container">
        <code-exec
          :traceId="traceId"
          v-for="traceId in traceIds"
          :key="traceId"
        ></code-exec>
      </div>
      <div v-else class="g-tab-container">
        <v-tabs show-arrows v-model="tab">
          <v-tab v-for="traceId in traceIds" :key="traceId">
            {{ traceId }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="fill-height">
          <v-tab-item
            v-for="traceId in traceIds"
            :key="traceId"
            class="fill-height"
          >
            <code-exec :traceId="traceId"></code-exec>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
    <script-editor v-else v-model="editing"></script-editor>
  </div>
</template>


<script>
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
  computed: {
    layout() {
      return this.$store.state.layout;
    },
  },
  watch: {
    editing(val) {
      this.$store.dispatch("editing", val);
    },
  },
};
</script>

<style scoped>
.g-grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
}
.g-tab-container {
  display: grid;
  height: 100%;
  grid-template-rows: min-content 1fr;
  row-gap: 3px;
}
</style>
