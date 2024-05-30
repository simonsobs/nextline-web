<template>
  <Suspense>
    <ScriptEditorE></ScriptEditorE>
    <template #fallback>
      <VProgressLinear indeterminate></VProgressLinear>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import ScriptEditorE from "./ScriptEditorE.vue";
</script>
