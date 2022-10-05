<template>
  <v-card flat height="100%" class="grey lighten-4">
    <v-system-bar color="primary" dark>
      <v-icon> mdi-language-python </v-icon>
      <span>&lt;string&gt;</span>
    </v-system-bar>
    <div class="g-container">
      <v-card-actions class="flex-row flex-wrap pa-1 grey lighten-4">
        <v-tooltip bottom open-delay="500" v-for="(b, i) in buttons" :key="i">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              icon
              outlined
              @click="onClick(b.method)"
              :disabled="b.disabled"
              v-bind="attrs"
              v-on="on"
              class="ma-1"
            >
              <v-icon>{{ b.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ b.text }}</span>
        </v-tooltip>
      </v-card-actions>
      <v-divider></v-divider>
      <div style="height: 100%">
        <div ref="editor" style="height: 100%; max-height: 100%"></div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useQuery, useMutation } from "@urql/vue";
import * as monaco from "monaco-editor";

import RESET from "@/graphql/mutations/Reset.gql";
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

const props = defineProps<{
  value: boolean;
}>();

interface Emits {
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emits>();

const source = ref("");

const model = monaco.editor.createModel("", "python");
model.onDidChangeContent((e) => {
  source.value = model.getValue();
});

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

const savedSourceLines = ref([] as string[]);
const savedSource = computed(() => {
  return savedSourceLines.value.join("\n");
});

const query = useQuery<{ source: string[] }>({
  query: QUERY_SOURCE,
});

watch(query.data, (data) => {
  if (data?.source) {
    savedSourceLines.value = data.source;
  }
});

watch(savedSource, (val) => {
  source.value = val;
  model.setValue(val);
});

const editing = computed(() => {
  return source.value !== savedSource.value;
});

watch(editing, (val) => {
  emit("input", val);
});

const buttons = computed(() => {
  return [
    {
      text: "Save",
      method: "save",
      disabled: !editing.value,
      icon: "mdi-content-save",
    },
    {
      text: "Reset",
      method: "reset",
      disabled: !editing.value,
      icon: "mdi-reload",
    },
  ];
});

async function onClick(method: string) {
  if (method === "save") await save();
  else if (method === "reset") reset();
  else {
    // console.log("Unknown method:", method);
  }
}

const { executeMutation } = useMutation(RESET);
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
