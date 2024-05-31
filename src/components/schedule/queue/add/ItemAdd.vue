<template>
  <div style="block-size: 100%; inline-size: 100%">
    <div class="g-container">
      <div class="g-top">
        <VTextField v-model="v$.name.$model" variant="outlined" label="Name (optional)">
        </VTextField>
      </div>
      <div class="g-editor">
        <Editor v-model="v$.script.$model"> </Editor>
      </div>
      <div class="g-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import Editor from "./Editor.vue";
import { required, minLength } from "@vuelidate/validators";

export interface State {
  name: string;
  script: string;
}

const initialState: State = {
  name: "",
  script: "",
};

interface Props {
  modelValue?: State;
  valid?: boolean;
  dirty?: boolean;
}
type Emits = {
  "update:modelValue": [value: State];
  "update:valid": [value: boolean];
  "update:dirty": [value: boolean];
};

const prop = defineProps<Props>();
const emit = defineEmits<Emits>();

const state = ref<State>({ ...initialState, ...prop.modelValue });

// Reset state when a parent component sets modelValue to undefined
watch(
  () => prop.modelValue,
  (value) => {
    if (value === undefined) {
      state.value = { ...initialState };
    }
  }
);

watchEffect(() => {
  emit("update:modelValue", state.value);
});

const rules = {
  name: {},
  script: { required, minLength: minLength(1) },
};

const v$ = useVuelidate(rules, state);

watchEffect(() => {
  emit("update:valid", !v$.value.$invalid);
});

watchEffect(() => {
  emit("update:dirty", v$.value.$anyDirty);
});
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  grid-template-areas: "top" "editor" "bottom";
}

.g-top {
  grid-area: top;
}

.g-editor {
  grid-area: editor;
  block-size: 100%;
}

.g-bottom {
  grid-area: bottom;
}
</style>
