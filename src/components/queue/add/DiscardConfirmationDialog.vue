<template>
  <VDialog v-model="show" max-width="400">
    <VCard class="pa-2">
      <VCardTitle class="text-primary"> Discard the change? </VCardTitle>
      <VCardActions class="mt-5">
        <VBtn variant="text" color="grey-darken-2" @click="show = false">
          back to edit
        </VBtn>
        <VSpacer></VSpacer>
        <VBtn variant="outlined" color="primary" @click="onConfirm"> discard </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
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
