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
    <v-menu location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-horizontal"> </v-btn>
      </template>
      <v-list>
        <v-list-item @click="emit('load')">
          <template v-slot:prepend>
            <v-icon> mdi-timer </v-icon>
          </template>
          Load From Scheduler
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
interface Props {
  editing: boolean;
}

type Emits = {
  reset: [];
  save: [];
  load: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
