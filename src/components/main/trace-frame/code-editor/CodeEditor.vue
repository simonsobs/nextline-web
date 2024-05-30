<template>
  <Suspense :timeout="0">
    <CodeEditorE
      :key="fileName"
      :file-name="fileName"
      :line-no="lineNo"
      :prompting="prompting"
    ></CodeEditorE>
    <template #fallback>
      <VProgressLinear indeterminate></VProgressLinear>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { PromptingData } from "@/graphql/codegen/generated";
import CodeEditorE from "./CodeEditorE.vue";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();
const { state } = toRefs(props);
const fileName = computed(() => state.value.fileName);
const lineNo = computed(() => state.value.lineNo);
const prompting = computed(() => state.value.prompting);
</script>
