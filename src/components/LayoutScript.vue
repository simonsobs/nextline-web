<template>
  <div class="fill-height">
    <v-container
      v-if="nextlineState == 'running'"
      fluid
      fill-height
      pa-0
      class="align-stretch"
    >
      <v-row v-if="layout == 'grid'">
        <v-col
          :cols="cols"
          :md="md"
          :lg="lg"
          v-for="traceId in traceIds"
          :key="traceId"
        >
          <code-exec :traceId="traceId"></code-exec>
        </v-col>
      </v-row>
      <v-row v-else class="fill-height flex-column flex-nowrap justify-start">
        <v-col class="flex-grow-0 py-0 pr-5">
          <v-tabs show-arrows v-model="tab">
            <v-tab v-for="traceId in traceIds" :key="traceId">
              {{ traceId }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col>
          <v-tabs-items v-model="tab" class="fill-height">
            <v-tab-item
              v-for="traceId in traceIds"
              :key="traceId"
              class="fill-height"
            >
              <code-exec :traceId="traceId"></code-exec>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
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
    cols() {
      return 12;
    },
    md() {
      if (this.traceIds.length <= 1) return 12;
      else return 6;
    },
    lg() {
      if (this.traceIds.length <= 1) return 12;
      else if (this.traceIds.length == 2) return 6;
      else return 4;
    },
  },
  watch: {
    editing(val) {
      this.$store.dispatch("editing", val);
    },
  },
};
</script>

<style>
</style>
