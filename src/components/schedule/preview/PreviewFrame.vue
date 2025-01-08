<template>
  <div class="g-container">Preview</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.g-container {
  position: relative;
  display: grid;
  overflow-y: auto;
  block-size: 100%;
  padding-bottom: calc(64px + 24px); /* 64px is the height of the fab button */
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas: "breadcrumb" "top" "table";
}
</style>
