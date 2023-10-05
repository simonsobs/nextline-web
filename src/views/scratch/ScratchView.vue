<template>
  <div class="g-container">
    <suspense-c>
      <component-a></component-a>
      <template #fallback>
        <v-skeleton-loader
          type="paragraph"
          min-width="360px"
        ></v-skeleton-loader>
      </template>
      <template #error="{ error }">
        <div>
          <v-alert variant="tonal" type="error" class="ma-2">
            {{ error }}
          </v-alert>
        </div>
      </template>
    </suspense-c>
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
