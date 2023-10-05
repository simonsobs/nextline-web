<template>
  <slot :run-no="runNo"></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  useQRunNoQuery,
  useRunNoSubscription,
} from "@/graphql/codegen/generated";

const query = await useQRunNoQuery();
const subscription = useRunNoSubscription();

const runNo = computed(
  () => subscription.data?.value?.runNo || query.data?.value?.runNo
);

// await new Promise((resolve) => setTimeout(resolve, 1000));
</script>
