<template>
  <suspense>
    <code-editor-e
      :key="fileName"
      :file-name="fileName"
      :line-no="lineNo"
      :prompting="prompting"
    ></code-editor-e>
    <template #fallback>
      <v-progress-linear indeterminate></v-progress-linear>
    </template>
  </suspense>
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
