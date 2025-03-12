<template>
  <div class="g-container">
    <div class="g-breadcrumb">
      <VBreadcrumbs :items="breadcrumb"> </VBreadcrumbs>
    </div>
    <div class="g-top">
      <VBtn variant="flat" color="primary-fixed" :loading="loading" @click="load">
        preview
      </VBtn>
    </div>
    <div v-if="!loading" class="g-body">
      <VAlert v-if="error" type="error" variant="tonal">
        <pre
          style="white-space: pre-wrap; overflow-wrap: anywhere"
          v-text="error"
        ></pre>
      </VAlert>
      <Suspense v-else-if="script">
        <editor :source="script"> </editor>
        <template #fallback>
          <VProgressLinear indeterminate></VProgressLinear>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from "./Editor.vue";
import { usePreview } from "./preview";
const breadcrumb = [{ title: "Scheduler Preview", disabled: false }];
const { script, loading, error, load } = usePreview();
</script>

<style scoped>
.g-container {
  block-size: 100%;
  display: grid;
  padding: 12px;
  row-gap: 24px;
  justify-content: center;
  grid-template-columns: minmax(min-content, 960px);
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas: "breadcrumb" "top" "body";
}

.g-breadcrumb {
  grid-area: breadcrumb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-top {
  grid-area: top;
  display: flex;
  align-items: center;
  gap: 12px;
}

.g-body {
  grid-area: body;
  block-size: 100%;
}
</style>
