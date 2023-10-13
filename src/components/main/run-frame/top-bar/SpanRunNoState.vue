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
  useQRunNoQuery,
  useQContinuousEnabledQuery,
  useRunNoSubscription,
  useContinuousEnabledSubscription,
} from "@/graphql/codegen/generated";

import { useSubscribeState } from "@/api";

const runNoQuery = useQRunNoQuery();
const runNoSubscription = useRunNoSubscription();

const runNo = computed(
  () => runNoSubscription.data?.value?.runNo || runNoQuery.data?.value?.runNo
);

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const continuousEnabledQuery = useQContinuousEnabledQuery();
const continuousEnabledSubscription = useContinuousEnabledSubscription();

const continuousEnabled = computed(
  () =>
    continuousEnabledSubscription.data?.value?.continuousEnabled ||
    continuousEnabledQuery.data?.value?.continuousEnabled
);

await stateSubscription;
</script>
