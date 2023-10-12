<template>
  <template v-if="on">
    <v-banner lines="one" icon="mdi-alert-outline">
      <template #text> Banner </template>
      <template #actions>
        <v-btn> Action </v-btn>
      </template>
    </v-banner>
  </template>
</template>
<script setup lang="ts">
import { ref } from "vue";
const on = ref(false);
</script>
