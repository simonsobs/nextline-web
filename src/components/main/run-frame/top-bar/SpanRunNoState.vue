<template>
  <span>
    <span class="font-weight-medium"> Run: {{ runNo || "unknown" }} </span>
    ⋅
    <span class="text-capitalize text-primary font-weight-bold">
      {{ state || "unknown" }}
    </span>
    <template v-if="state === 'running' && !continuousEnabled">
      ⋅
      <span class="text-capitalize text-primary font-weight-bold"> Interactive </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  useQContinuousEnabledQuery,
  useContinuousEnabledSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeRunNo, useSubscribeState } from "@/api";

const runNoSubscription = useSubscribeRunNo();
const { runNo } = runNoSubscription;

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const continuousEnabledQuery = useQContinuousEnabledQuery();
const continuousEnabledSubscription = useContinuousEnabledSubscription();

const continuousEnabled = computed(
  () =>
    continuousEnabledSubscription.data?.value?.continuousEnabled ||
    continuousEnabledQuery.data?.value?.continuousEnabled
);

await Promise.all([runNoSubscription, stateSubscription]);
</script>
