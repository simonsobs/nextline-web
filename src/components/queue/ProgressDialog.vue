<template>
  <v-dialog persistent v-model="show">
    <v-sheet>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-sheet>
  </v-dialog>
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
