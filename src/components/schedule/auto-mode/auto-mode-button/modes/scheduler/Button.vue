<template>
  <Component :is="menuComponent">
    <template #activator="{ props }">
      <VBtn v-bind="props" variant="tonal" color="tertiary">
        Auto Mode: Scheduler
      </VBtn>
    </template>
    <div>
      <Dialog class="dialog"></Dialog>
    </div>
  </Component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { VMenu } from "vuetify/components/VMenu"
import { VBottomSheet } from "vuetify/components/VBottomSheet"
import Dialog from "./Dialog.vue";
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
