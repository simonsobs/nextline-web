<template>
  <v-card-actions class="flex-row flex-wrap justify-end">
    <v-btn
      variant="outlined"
      prepend-icon="mdi-reload"
      :disabled="!editing"
      @click="emit('reset')"
    >
      discard changes
    </v-btn>
    <v-btn
      variant="flat"
      prepend-icon="mdi-content-save"
      :disabled="!editing"
      @click="emit('save')"
    >
      save
    </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
interface Props {
  editing: boolean;
}

type Emits = {
  reset: [];
  save: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
