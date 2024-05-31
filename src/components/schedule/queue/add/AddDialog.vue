<template>
  <VDialog
    v-model="show"
    :fullscreen="mobile"
    :persistent="dirty"
    :transition="transition"
  >
    <VSheet class="g-container pa-5" :class="{ 'g-mobile': mobile }">
      <div class="g-top d-flex">
        <VBtn
          v-if="mobile"
          variant="text"
          icon="mdi-close"
          @click="onClickCancel"
        ></VBtn>
      </div>
      <div class="g-title text-primary text-h5">Add a Python script to the queue</div>
      <div class="g-content">
        <ItemAdd v-model="state" v-model:valid="valid" v-model:dirty="dirty">
        </ItemAdd>
      </div>
      <div class="g-bottom d-flex">
        <VBtn variant="text" @click="onClickCancel">Cancel</VBtn>
        <VSpacer></VSpacer>
        <VBtn variant="flat" :disabled="!valid" @click="onClickAdd">Add</VBtn>
      </div>
    </VSheet>
    <DiscardConfirmationDialog
      v-model="dialogConfirmDiscard"
      @confirm="clearAndClose"
    >
    </DiscardConfirmationDialog>
    <LoadingIndicator v-model="loading"> </LoadingIndicator>
    <ErrorDialog v-model="dialogError" :error="error">
    </ErrorDialog>
  </VDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import type { CombinedError } from "@urql/vue";
import ItemAdd from "./ItemAdd.vue";
import type { State } from "./ItemAdd.vue";
import DiscardConfirmationDialog from "./DiscardConfirmationDialog.vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import ErrorDialog from "../ErrorDialog.vue";
import { useItems } from "../items";
const show = defineModel<boolean>();
const { mobile } = useDisplay();
const transition = computed(() =>
  mobile.value ? "slide-x-reverse-transition" : "dialog-transition"
);
const state = ref<State>();
const valid = ref<boolean>();
const dirty = ref<boolean>();
const dialogConfirmDiscard = ref<boolean>(false);
const loading = ref<boolean>(false);
const dialogError = ref<boolean>(false);
const error = ref<CombinedError>();

function clearAndClose() {
  state.value = undefined;
  show.value = false;
}

// Show the confirmation dialog if the form is edited
function onClickCancel() {
  if (dirty.value) {
    dialogConfirmDiscard.value = true;
  } else {
    clearAndClose();
  }
}

const { addItem } = useItems();

async function onClickAdd() {
  if (state.value === undefined) return;
  loading.value = true;
  const result = await addItem(state.value);
  loading.value = false;
  if(result.error) {
    error.value = result.error;
    dialogError.value = true;
    return;
  }
  clearAndClose();
}
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 70vh;
  inline-size: 100%;
  max-inline-size: 960px;
  margin: auto;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(0, 1fr) min-content;
  grid-template-areas: "top" "title" "content" "bottom";
}

.g-mobile {
  block-size: 100%;
}

.g-top {
  grid-area: top;
}

.g-title {
  grid-area: title;
}

.g-content {
  grid-area: content;
  block-size: 100%;
}

.g-bottom {
  grid-area: bottom;
}
</style>
