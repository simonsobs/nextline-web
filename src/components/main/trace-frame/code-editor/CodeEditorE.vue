<template>
  <template v-if="source !== undefined">
    <editor :key="source" :state="state" :source="source"> </editor>
  </template>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import { PromptingData } from "@/graphql/codegen/generated";

import Editor from "./Editor.vue";

import { useSource } from "./source";

interface Props {
  state: PromptingData;
  fileName: string;
}

const props = defineProps<Props>();
const { state, fileName } = toRefs(props);
const { source } = await useSource(fileName);
</script>
