<template>
  <span>
    <span class="font-weight-medium"> Run: {{ runNo }} </span>
    ⋅
    <span class="text-capitalize text-primary font-weight-bold">
      {{ state }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStateSubscription, useRunNoSubscription } from "@/gql/graphql";

const stateSubscription = useStateSubscription();
const state = computed(() => stateSubscription.data?.value?.state || "unknown");

const runNoSubscription = useRunNoSubscription();
const runNo = computed(() => runNoSubscription.data?.value?.runNo);
</script>
