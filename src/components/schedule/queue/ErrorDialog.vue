<template>
  <VDialog v-model="show" max-width="800">
    <VCard class="pa-2">
      <VCardTitle class="text-error"> An error occurred</VCardTitle>
      <VCardText class="text-error">
        <pre>{{ error }}</pre>
      </VCardText>
      <VCardActions class="mt-5">
        <VSpacer></VSpacer>
        <VBtn variant="text" color="primary" @click="onOk"> OK </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { CombinedError } from "@urql/vue";
const show = defineModel<boolean>();
interface Props {
  error?: CombinedError;
}
type Emits = {
  ok: [];
};
defineProps<Props>();
const emit = defineEmits<Emits>();
function onOk() {
  emit("ok");
  show.value = false;
}
</script>
