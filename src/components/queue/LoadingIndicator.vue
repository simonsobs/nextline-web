<template>
  <VDialog persistent v-model="show">
    <VSheet>
      <VProgressCircular indeterminate color="primary"></VProgressCircular>
    </VSheet>
  </VDialog>
</template>

<script setup lang="ts">
const show = defineModel<boolean>();
</script>

<style scoped>
.v-sheet {
  margin: auto;
  padding: 24px;
}
</style>
