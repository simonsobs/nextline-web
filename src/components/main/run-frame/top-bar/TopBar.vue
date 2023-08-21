<template>
  <div>
    <v-card-actions id="main">
      <span-run-no-state></span-run-no-state>
      <component :is="actionComponent" v-if="actionComponent"></component>
    </v-card-actions>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useScheduleStore } from "@/stores/schedule";

import {
  useQStateQuery,
  useStateSubscription,
} from "@/graphql/codegen/generated";
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

// Use "any" because Component causes an error for unknown reason
const actionComponent = computed<any | null>(() => {
  if (autoMode.value) {
    switch (state.value) {
      case "running":
        return ActionRunning;
      default:
        return null;
    }
  } else {
    switch (state.value) {
      case "initialized":
        return ActionInitialized;
      case "running":
        return ActionRunning;
      case "finished":
        return ActionFinished;
      default:
        return null;
    }
  }
});
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
