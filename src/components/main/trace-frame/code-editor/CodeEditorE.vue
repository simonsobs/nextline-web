<template>
  <template v-if="source !== undefined">
    <Editor :key="source" :source="source" :line-no="lineNo" :prompting="prompting">
    </Editor>
  </template>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import Editor from "./Editor.vue";
import { useSource } from "./source";

interface Props {
  fileName: string;
  lineNo: number;
  prompting: number;
}

const props = defineProps<Props>();
const { fileName, lineNo, prompting } = toRefs(props);
const { source } = await useSource(fileName);
</script>
