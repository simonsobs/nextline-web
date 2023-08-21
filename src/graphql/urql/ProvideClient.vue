<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useProvideClient } from "@/graphql/urql";
useProvideClient();
</script>
