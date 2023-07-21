<template>
  <v-layout full-height style="width: 100%">
    <v-card flat class="g-container" rounded="0">
      <v-card-actions class="g-header flex-row flex-wrap">
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
      <div class="g-content">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
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
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-areas: "header" "content";
}

.g-header {
  grid-area: header;
}

.g-content {
  grid-area: content;
  block-size: 100%;
}
</style>
