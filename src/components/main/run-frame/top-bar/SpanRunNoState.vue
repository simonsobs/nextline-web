<template>
  <span>
    <span class="font-weight-medium"> Run: {{ runNo || "unknown" }} </span>
    ⋅
    <span class="text-capitalize text-primary font-weight-bold">
      {{ state || "unknown" }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  useQStateQuery,
  useQRunNoQuery,
  useStateSubscription,
  useRunNoSubscription,
} from "@/gql/graphql";

const stateQuery = useQStateQuery();
const stateSubscription = useStateSubscription();

const state = computed(
  () => stateSubscription.data?.value?.state || stateQuery.data?.value?.state
);

const runNoQuery = useQRunNoQuery();
const runNoSubscription = useRunNoSubscription();

const runNo = computed(
  () => runNoSubscription.data?.value?.runNo || runNoQuery.data?.value?.runNo
);
</script>
