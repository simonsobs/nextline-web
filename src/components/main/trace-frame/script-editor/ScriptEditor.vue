<template>
  <suspense>
    <script-editor-e></script-editor-e>
    <template #fallback>
      <v-progress-linear indeterminate></v-progress-linear>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import ScriptEditorE from "./ScriptEditorE.vue";
</script>
