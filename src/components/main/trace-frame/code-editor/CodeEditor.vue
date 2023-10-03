<template>
  <editor
    :key="source"
    :state="state"
    :source="source"
    v-if="source !== undefined"
  >
  </editor>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

import { PromptingData } from "@/graphql/codegen/generated";

import Editor from "./Editor.vue";

import { useSource } from "./source";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();
const { state } = toRefs(props);
const fileName = computed(() => state.value.fileName);
const { source } = useSource(fileName);
</script>
