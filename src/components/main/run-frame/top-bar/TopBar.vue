<template>
  <div>
    <v-card-actions id="main">
      <span-run-no-state></span-run-no-state>
      <v-spacer></v-spacer>
      <template v-if="!autoMode && state === 'initialized'">
        <action-initialized></action-initialized>
      </template>
      <template v-else-if="state === 'running'">
        <action-running></action-running>
      </template>
      <template v-else-if="!autoMode && state === 'finished'">
        <action-finished></action-finished>
      </template>
    </v-card-actions>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useScheduleStore } from "@/stores/schedule";

import { useQStateQuery, useStateSubscription } from "@/gql/graphql";
import { storeToRefs } from "pinia";
import SpanRunNoState from "./SpanRunNoState.vue";
import ActionInitialized from "./ActionInitialized.vue";
import ActionRunning from "./ActionRunning.vue";
import ActionFinished from "./ActionFinished.vue";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();
const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const scheduleStore = useScheduleStore();
const { autoMode } = storeToRefs(scheduleStore);
</script>

<style scoped>
#main {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: center;
  column-gap: 4px;
  min-height: 0px; /* override v-card-actions */
}
</style>
