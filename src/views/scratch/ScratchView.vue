<template>
  <div class="g-container">
    <v-alert v-if="error" variant="tonal" type="error">
      {{ error }}
    </v-alert>
    <Suspense v-else>
      <component-a></component-a>
      <template #fallback>
        <v-skeleton-loader
          type="paragraph"
          min-width="360px"
        ></v-skeleton-loader>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import ComponentA from "@/components/scratch/A.vue";

const error = ref<Error>();

onErrorCaptured((e, instance, info) => {
  console.error(e, instance, info);
  error.value = e;
  return false;
});
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  place-items: center;
}
</style>
