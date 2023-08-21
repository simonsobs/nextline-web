<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProvideClient } from "@/graphql/urql";
import { useConfig } from "@/utils/config";
const { config } = useConfig();
const url = computed(() => config.value.apiHttp);
useProvideClient(url.value);
</script>