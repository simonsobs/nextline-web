<template>
  <v-layout full-height style="width: 100%">
    <!--
    v-layout-can be removed when v-system-bar is removed.
    v-layout is there to prevent the height of v-system-bar from being included
    in the padding top of v-main.
   -->
    <v-card flat height="100%" class="bg-grey-lighten-4" style="width: 100%">
      <v-system-bar color="primary" dark style="position: static">
        <v-icon> mdi-language-python </v-icon>
        <span>&lt;string&gt;</span>
      </v-system-bar>
      <div class="g-container">
        <v-card-actions class="flex-row flex-wrap grey-lighten-4">
          <v-btn
            variant="outlined"
            prepend-icon="mdi-content-save"
            :disabled="!editing"
            @click="onClick('save')"
          >
            save
          </v-btn>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-reload"
            :disabled="!editing"
            @click="onClick('reset')"
          >
            discard changes
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <div style="height: 100%">
          <div ref="editor" style="height: 100%; max-height: 100%"></div>
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, watchEffect } from "vue";
import { watchDebounced } from "@vueuse/core";
import * as monaco from "monaco-editor";

import { useSourceQuery, useResetMutation } from "@/gql/graphql";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (event: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const source = ref("");

const model = monaco.editor.createModel("", "python");

const nChangeContents = ref(0);

model.onDidChangeContent((e) => {
  nChangeContents.value += 1;
});

watchDebounced(
  nChangeContents,
  () => {
    source.value = model.getValue();
  },
  { debounce: 500, maxWait: 1000 }
);

const editor = ref(null as HTMLElement | null);

onMounted(() => {
  if (!editor.value) return;
  monaco.editor.create(editor.value, {
    model,
    minimap: { enabled: false },
    scrollbar: { vertical: "auto", horizontal: "auto" },
    fontFamily: "Fira Code",
    fontSize: 14,
    fontWeight: "500",
    fontLigatures: true,
    lineHeight: 24,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    theme: "nextline",
  });
});

const query = useSourceQuery();
const savedSourceLines = computed(() => query.data.value?.source || []);
const savedSource = computed(() => savedSourceLines.value.join("\n"));

// watchEffect(() => {
//   source.value = savedSource.value;
//   model.setValue(savedSource.value);
// });

// Note: watchEffect() above is triggered by the change in nChangeContents for
// unknown reason. Use watch() below instead.

watch(
  savedSource,
  (val) => {
    source.value = val;
    model.setValue(val);
  },
  { immediate: true }
);

const editing = computed(() => {
  return source.value !== savedSource.value;
});

watch(editing, (val) => {
  emit("update:modelValue", val);
});

type Method = "save" | "reset";

async function onClick(method: Method) {
  if (method === "save") await save();
  else if (method === "reset") reset();
  else {
    // console.log("Unknown method:", method);
  }
}

const { executeMutation } = useResetMutation();
async function save() {
  await executeMutation({ statement: source.value });
  query.executeQuery();
}
function reset() {
  query.executeQuery();
  model.setValue(savedSource.value);
  source.value = savedSource.value;
}
</script>

<style scoped>
.g-container {
  display: grid;
  height: calc(100% - 24px); /* 24px: system bar */
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(0, 1fr);
}
</style>
