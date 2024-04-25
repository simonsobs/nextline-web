<template>
  <div style="block-size: 100%; inline-size: 100%">
    <div class="g-container">
      <div class="g-top">
        <div>
          <span class="font-weight-bold">Name:</span> {{ item?.name }}
        </div>
        <div>
          <span class="font-weight-bold">Created at:</span> {{ item?.createdAt }}
        </div>
      </div>
      <div class="g-editor">
        <editor :source="item?.script"> </editor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "../items";
import Editor from "./Editor.vue";
interface Props {
  item: Item;
}
defineProps<Props>();
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-areas: "top" "editor";
}

.g-top {
  grid-area: top;
}

.g-editor {
  grid-area: editor;
  block-size: 100%;
}
</style>
