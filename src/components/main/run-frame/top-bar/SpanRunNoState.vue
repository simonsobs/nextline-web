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
    <VBadge dot inline color="primary" v-if="state === 'running'"> </VBadge>
  </span>
</template>

<script setup lang="ts">
import {
  useSubscribeRunNo,
  useSubscribeState,
  useSubscribeContinuousEnabled,
} from "@/api";

const runNoSubscription = useSubscribeRunNo();
const { runNo } = runNoSubscription;

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const continuousEnabledSubscription = useSubscribeContinuousEnabled();
const { continuousEnabled } = continuousEnabledSubscription;

await Promise.all([
  runNoSubscription,
  stateSubscription,
  continuousEnabledSubscription,
]);
</script>
