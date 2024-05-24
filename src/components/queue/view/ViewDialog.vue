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
    <progress-dialog v-model="dialogProgress"> </progress-dialog>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useDisplay } from "vuetify";
import ItemView from "./ItemView.vue";
import { useItems } from "../items";
import type { Item } from "../items";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import ProgressDialog from "../ProgressDialog.vue";

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
const dialogProgress = ref<boolean>(false);
const { deleteItem } = useItems();
async function onDeleteConfirmed() {
  dialogProgress.value = true;
  await deleteItem(item.value);
  dialogProgress.value = false;
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
