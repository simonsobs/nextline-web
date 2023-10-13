<template>
  <slot :run-no="runNo"></slot>
</template>

<script setup lang="ts">
import { useSubscribeRunNo } from "@/api";
const runNoSubscription = useSubscribeRunNo();
const { runNo } = runNoSubscription;
await runNoSubscription;
</script>
