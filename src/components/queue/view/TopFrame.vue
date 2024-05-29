<template>
  <div class="d-flex">
    <VBtn v-if="mobile" variant="text" icon="mdi-close" @click="show = false"></VBtn>
    <VSpacer></VSpacer>
    <VBtn
      variant="text"
      icon="mdi-trash-can-outline"
      @click="dialogConfirmDelete = true"
    ></VBtn>
    <VMenu>
      <template v-slot:activator="{ props }">
        <VBtn v-bind="props" variant="text" icon="mdi-dots-horizontal"></VBtn>
      </template>
      <VList>
        <VListSubheader>Move (Reorder)</VListSubheader>
        <VListItem :disabled="atTop">
          <template v-slot:prepend>
            <v-icon> mdi-arrow-up </v-icon>
          </template>
          To Top
        </VListItem>
        <VListItem :disabled="atTop">
          <template v-slot:prepend>
            <v-icon> mdi-arrow-up-thin </v-icon>
          </template>
          One Up
        </VListItem>
        <VListItem :disabled="atBottom">
          <template v-slot:prepend>
            <v-icon> mdi-arrow-down-thin </v-icon>
          </template>
          One Down
        </VListItem>
        <VListItem :disabled="atBottom">
          <template v-slot:prepend>
            <v-icon> mdi-arrow-down</v-icon>
          </template>
          To Bottom
        </VListItem>
      </VList>
    </VMenu>
    <DeleteConfirmationDialog
      v-model="dialogConfirmDelete"
      :item="item"
      @confirm="onDeleteConfirmed"
    >
    </DeleteConfirmationDialog>
    <LoadingIndicator v-model="loading"> </LoadingIndicator>
    <ErrorDialog v-model="dialogError" :error="error"> </ErrorDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useDisplay } from "vuetify";
import type { CombinedError } from "@urql/vue";
import { useItems } from "../items";
import type { Item } from "../items";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import ErrorDialog from "../ErrorDialog.vue";

const { mobile } = useDisplay();

interface Props {
  item: Item;
  nItems: number;
}
const props = defineProps<Props>();
const { item } = toRefs(props);
const show = defineModel<boolean>();
const dialogConfirmDelete = ref(false);
const loading = ref<boolean>(false);
const dialogError = ref<boolean>(false);
const error = ref<CombinedError>();

const { items, deleteItem } = useItems();

const nItems = computed(() => items.value?.length ?? 0);

const atTop = computed(() => item.value.order === 1);
const atBottom = computed(() => item.value.order === nItems.value);

async function onDeleteConfirmed() {
  loading.value = true;
  const result = await deleteItem(item.value);
  loading.value = false;
  if (result.error) {
    error.value = result.error;
    dialogError.value = true;
    return;
  }
  show.value = false;
}
</script>

<style scoped></style>
