<template>
  <slot></slot>
</template>

<script setup lang="ts">
/**
 * Provide the config to the slot.
 * The config will be reactive.
 */
import { toRefs } from "vue";
import { useProvideConfig, Config } from "@/utils/config";
interface Props {
  config: Config;
}
const prop = defineProps<Props>();
const { config } = toRefs(prop);
useProvideConfig(config);
</script>
