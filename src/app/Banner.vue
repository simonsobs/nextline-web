<template>
  <template v-if="on">
    <VBanner lines="one" icon="mdi-alert-outline">
      <template #text> Banner </template>
      <template #actions>
        <VBtn> Action </VBtn>
      </template>
    </VBanner>
  </template>
</template>
<script setup lang="ts">
import { ref } from "vue";
const on = ref(false);
</script>
