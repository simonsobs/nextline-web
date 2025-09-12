<template>
  <div>
    <VCard>
      <VAlert
        type="error"
        variant="tonal"
        title="Error"
        text="Unable to determine auto mode state."
      >
        <pre>{{ error }}</pre>
      </VAlert>
    </VCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: Error;
}

defineProps<Props>();
</script>
