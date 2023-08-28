<template>
  <v-layout full-height>
    <v-card flat class="g-container" rounded="0">
      <div class="g-content">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
      <actions class="g-header" :editing="editing" @reset="reset" @save="save">
      </actions>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";

import { useStore } from "@/plugins/pinia/stores/main";
import { useSourceQuery, useResetMutation } from "@/graphql/codegen/generated";

import { useMonacoEditor } from "./monaco-editor";

import Actions from "./Actions.vue";

const editor = ref<HTMLElement>();

const query = useSourceQuery();
const savedSourceLines = computed(() => query.data.value?.source || []);
const savedSource = computed(() => savedSourceLines.value.join("\n"));

const source = ref("");
watchEffect(() => {
  source.value = savedSource.value;
});

useMonacoEditor(editor, source);

const editing = computed(() => {
  return source.value !== savedSource.value;
});

const store = useStore();

watch(editing, (val) => {
  store.setModified(val);
});

const { executeMutation } = useResetMutation();

async function save() {
  await executeMutation({ statement: source.value });
  query.executeQuery();
}

function reset() {
  query.executeQuery();
  source.value = savedSource.value;
}
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
