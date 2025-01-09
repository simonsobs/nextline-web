<template>
  <div class="g-container">
    <div class="g-breadcrumb">
      <VBreadcrumbs :items="breadcrumb"> </VBreadcrumbs>
    </div>
    <div class="g-top">
      <VBtn variant="flat" color="primary-fixed"> preview </VBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
const breadcrumb = [{ title: "Scheduler Preview", disabled: false }];
</script>

<style scoped>
.g-container {
  display: grid;
  padding: 12px;
  justify-content: center;
  grid-template-columns: minmax(min-content, 960px);
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas: "breadcrumb" "top" "table";
}

.g-breadcrumb {
  grid-area: breadcrumb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-top {
  grid-area: top;
}
</style>
