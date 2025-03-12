<template>
  <div>
    <div v-if="state">{{ state }}</div>
    <div v-if="sub">{{ sub }}</div>
    <pre v-if="subscription">{{ subscription }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  useCtrlStateQuery,
  useCtrlStateSSubscription,
} from "@/graphql/codegen/generated";

const query = useCtrlStateQuery({});
const subscription = useCtrlStateSSubscription({});

const state = computed(() => query.data);
const sub = computed(() => subscription.data);
</script>

<style></style>
