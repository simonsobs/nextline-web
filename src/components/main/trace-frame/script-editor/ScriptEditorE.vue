<template>
  <v-layout full-height>
    <v-card flat class="g-container" rounded="0">
      <div class="g-content">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
      <actions
        class="g-header"
        :editing="modified"
        @reset="reset"
        @save="save"
        @load="load"
      >
      </actions>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "@/plugins/pinia/stores/main";
import { useMonacoEditor } from "@/utils/monaco-editor";
import { useSource } from "./source";
import Actions from "./Actions.vue";
const editor = ref<HTMLElement>();
const { source, modified, save, reset, load } = await useSource();
useMonacoEditor({ element: editor, source, mode: "editor" });
const store = useStore();
watch(modified, (val) => {
  store.setModified(val);
});
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
