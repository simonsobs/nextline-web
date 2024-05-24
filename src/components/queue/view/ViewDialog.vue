<template>
  <v-dialog v-model="show" :fullscreen="mobile" :transition="transition">
    <v-sheet class="g-container pa-4" :class="{ 'g-mobile': mobile }">
      <div class="g-top d-flex">
        <v-btn
          v-if="mobile"
          variant="text"
          icon="mdi-close"
          @click="show = false"
        ></v-btn>
        <v-spacer v-if="!mobile"></v-spacer>
        <v-btn
          variant="text"
          icon="mdi-trash-can-outline"
          @click="dialogConfirmDelete = true"
        ></v-btn>
      </div>
      <div class="g-content">
        <item-view :item="item"> </item-view>
      </div>
      <div class="g-bottom d-flex" v-if="!mobile">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="show = false">Close</v-btn>
      </div>
    </v-sheet>
    <delete-confirmation-dialog
      v-model="dialogConfirmDelete"
      :item="item"
      @confirm="onDeleteConfirmed"
    >
    </delete-confirmation-dialog>
    <LoadingIndicator v-model="loading"> </LoadingIndicator>
    <ErrorDialog v-model="dialogError" :error="error">
    </ErrorDialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useDisplay } from "vuetify";
import type { CombinedError } from "@urql/vue";
import ItemView from "./ItemView.vue";
import { useItems } from "../items";
import type { Item } from "../items";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import ErrorDialog from "../ErrorDialog.vue";

const { mobile } = useDisplay();

const transition = computed(() =>
  mobile.value ? "slide-x-reverse-transition" : "dialog-transition"
);

interface Props {
  item: Item;
}
const props = defineProps<Props>();
const { item } = toRefs(props);
const show = defineModel<boolean>();
const dialogConfirmDelete = ref(false);
const loading = ref<boolean>(false);
const dialogError = ref<boolean>(false);
const error = ref<CombinedError>();

const { deleteItem } = useItems();
async function onDeleteConfirmed() {
  loading.value = true;
  const result = await deleteItem(item.value);
  loading.value = false;
  if(result.error) {
    error.value = result.error;
    dialogError.value = true;
    return;
  }
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
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  grid-template-areas: "top" "content" "bottom";
}

.g-mobile {
  block-size: 100%;
}

.g-top {
  grid-area: top;
}

.g-content {
  grid-area: content;
  block-size: 100%;
}

.g-bottom {
  grid-area: bottom;
}
</style>
