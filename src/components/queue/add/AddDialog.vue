<template>
  <v-dialog
    v-model="show"
    :fullscreen="mobile"
    :persistent="dirty"
    :transition="transition"
  >
    <v-sheet class="g-container pa-5" :class="{ 'g-mobile': mobile }">
      <div class="g-top d-flex">
        <v-btn
          v-if="mobile"
          variant="text"
          icon="mdi-close"
          @click="onClickCancel"
        ></v-btn>
      </div>
      <div class="g-title text-primary text-h5">Add a Python script to the queue</div>
      <div class="g-content">
        <item-add v-model="state" v-model:valid="valid" v-model:dirty="dirty">
        </item-add>
      </div>
      <div class="g-bottom d-flex">
        <v-btn variant="text" @click="onClickCancel">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn variant="flat" :disabled="!valid" @click="onClickAdd">Add</v-btn>
      </div>
    </v-sheet>
    <discard-confirmation-dialog
      v-model="dialogConfirmDiscard"
      @confirm="discardConfirmed"
    >
    </discard-confirmation-dialog>
    <progress-dialog v-model="dialogProgress"> </progress-dialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import ItemAdd from "./ItemAdd.vue";
import type { State } from "./ItemAdd.vue";
import DiscardConfirmationDialog from "./DiscardConfirmationDialog.vue";
import ProgressDialog from "../ProgressDialog.vue";
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
const dialogProgress = ref<boolean>(false);

// Show the confirmation dialog if the form is edited
function onClickCancel() {
  if (dirty.value) {
    dialogConfirmDiscard.value = true;
  } else {
    show.value = false;
  }
}

function discardConfirmed() {
  state.value = undefined;
  show.value = false;
}

const { addItem } = useItems();

async function onClickAdd() {
  if (state.value === undefined) return;
  dialogProgress.value = true;
  await addItem(state.value);
  dialogProgress.value = false;
  state.value = undefined;
  show.value = false;
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
