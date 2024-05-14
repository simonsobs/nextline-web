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
  useQStateQuery,
  useStateSubscription,
} from "@/graphql/codegen/generated";

const query = useQStateQuery({});
const subscription = useStateSubscription({});

const state = computed(() => query.data);
const sub = computed(() => subscription.data);
</script>

<style></style>
