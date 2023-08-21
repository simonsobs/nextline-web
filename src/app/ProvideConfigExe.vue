<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useProvideConfig, Config } from "@/utils/config";
interface Props {
  config: Config;
}
const prop = defineProps<Props>();
useProvideConfig(prop.config);
</script>
