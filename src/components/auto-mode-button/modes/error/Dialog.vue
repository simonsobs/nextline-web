<template>
  <div>
    <VCard>
      <VAlert
        type="error"
        variant="tonal"
        title="Error"
        text="Unable to determine auto mode state."
      >
      </VAlert>
    </VCard>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
