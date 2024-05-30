<template>
  <div class="g-container">
    <SuspenseC>
      <ComponentA></ComponentA>
      <template #fallback>
        <VSkeletonLoader type="paragraph" min-width="360px"></VSkeletonLoader>
      </template>
      <template #error="{ error }">
        <div>
          <VAlert variant="tonal" type="error" class="ma-2">
            {{ error }}
          </VAlert>
        </div>
      </template>
    </SuspenseC>
  </div>
</template>

<script setup lang="ts">
import ComponentA from "@/components/scratch/A.vue";
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  place-items: center;
}
</style>
