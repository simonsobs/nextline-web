<template>
  <span>
    <span class="font-weight-medium"> Run: {{ runNo || "unknown" }} </span>
    ⋅
    <span class="text-capitalize text-primary font-weight-bold">
      {{ state || "unknown" }}
    </span>
    <template v-if="state === 'running' && !continuousEnabled">
    ⋅
    <span class="text-capitalize text-primary font-weight-bold">
      Interactive
    </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  useQStateQuery,
  useQRunNoQuery,
  useQContinuousEnabledQuery,
  useStateSubscription,
  useRunNoSubscription,
  useContinuousEnabledSubscription,
} from "@/gql/graphql";

const runNoQuery = useQRunNoQuery();
const runNoSubscription = useRunNoSubscription();

const runNo = computed(
  () => runNoSubscription.data?.value?.runNo || runNoQuery.data?.value?.runNo
);
const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();

const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const continuousEnabledQuery = useQContinuousEnabledQuery();
const continuousEnabledSubscription = useContinuousEnabledSubscription();

const continuousEnabled = computed(
  () =>
    continuousEnabledSubscription.data?.value?.continuousEnabled ||
    continuousEnabledQuery.data?.value?.continuous.continuousEnabled
);
</script>
