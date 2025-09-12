<template>
  <Component :is="menuComponent">
    <template #activator="{ props }">
      <VBtn v-bind="props" variant="tonal" color="error">
        <VIcon icon="mdi-alert-circle-outline" size="x-large"></VIcon>
      </VBtn>
    </template>
    <DialogError :error="error"></DialogError>
  </Component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { VBottomSheet } from "vuetify/components/VBottomSheet";
import { VMenu } from "vuetify/components/VMenu";
import DialogError from "./Dialog.vue";

interface Props {
  error: Error;
}

defineProps<Props>();

const { mobile } = useDisplay();
const menuComponent = computed(() => (mobile.value ? VBottomSheet : VMenu));
</script>

<style scoped>
.v-bottom-sheet .dialog {
  border-radius: 0 !important;
  padding: 4px 4px 24px 4px;
}

.v-menu .dialog {
  width: 290px;
  padding: 4px;
}
</style>
