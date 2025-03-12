<template>
  <VLayout full-height>
    <VCard flat class="g-container" rounded="0">
      <div class="g-content">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
      <Actions
        class="g-header"
        :editing="modified"
        @reset="reset"
        @save="save"
        @load="load"
        @load-example="loadExample"
      >
      </Actions>
    </VCard>
  </VLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useMonacoEditor } from "@/utils/monaco-editor";

import Actions from "./Actions.vue";
import { useSource } from "./source";
const editor = ref<HTMLElement>();
const { source, modified, save, reset, load, loadExample } = await useSource();
await useMonacoEditor({ element: editor, source, mode: "editor" });
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(0, 1fr) min-content;
  grid-template-areas: "content" "header";
}

.g-content {
  grid-area: content;
  block-size: 100%;
  inline-size: 100%;
}

.g-header {
  grid-area: header;
}
</style>
