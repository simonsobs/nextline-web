<template>
  <VTooltip>
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        variant="text"
        :disabled="disabled"
        icon
        @click="emit('refresh')"
      >
        <VIcon icon="mdi-refresh"></VIcon>
      </VBtn>
    </template>
    <span>Refresh</span>
  </VTooltip>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
}
type Emits = {
  refresh: [];
};
defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
