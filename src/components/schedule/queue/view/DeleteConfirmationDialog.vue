<template>
  <VDialog v-model="show" max-width="400">
    <VCard class="pa-2">
      <VCardTitle class="text-error"> Delete? </VCardTitle>
      <VCardText>
        <div><span class="font-weight-bold">Name:</span> {{ item?.name }}</div>
        <div>
          <span class="font-weight-bold">Created at:</span> {{ item?.createdAt }}
        </div>
      </VCardText>
      <VCardActions>
        <VBtn variant="text" color="grey-darken-2" @click="show = false">
          cancel
        </VBtn>
        <VSpacer></VSpacer>
        <VBtn variant="outlined" color="error" @click="onConfirm"> delete </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { Item } from "../items";
interface Props {
  item: Item;
}
defineProps<Props>();
const show = defineModel<boolean>();
type Emits = {
  confirm: [];
};
const emit = defineEmits<Emits>();
function onConfirm() {
  emit("confirm");
  show.value = false;
}
</script>
