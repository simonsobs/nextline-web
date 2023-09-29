<template>
  <v-tooltip>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        :disabled="disabled"
        icon
        @click="emit('refresh')"
      >
        <v-icon icon="mdi-refresh"></v-icon>
      </v-btn>
    </template>
    <span>Refresh</span>
  </v-tooltip>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
}
type Emits = {
  "refresh": [];
}
defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
