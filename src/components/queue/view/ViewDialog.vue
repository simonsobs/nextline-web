<template>
  <VDialog v-model="show" :fullscreen="mobile" :transition="transition">
    <VSheet class="g-container pa-4" :class="{ 'g-mobile': mobile }">
      <div class="g-top">
        <TopFrame v-model="show" :item="item" :n-items="nItems"> </TopFrame>
      </div>
      <div class="g-content">
        <ContentFrame :item="item" :n-items="nItems"> </ContentFrame>
      </div>
      <div class="g-bottom d-flex" v-if="!mobile">
        <VSpacer></VSpacer>
        <VBtn variant="text" @click="show = false">Close</VBtn>
      </div>
    </VSheet>
  </VDialog>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useDisplay } from "vuetify";
import TopFrame from "./TopFrame.vue";
import ContentFrame from "./ContentFrame.vue";
import { useItems } from "../items";
import type { Item } from "../items";

const { mobile } = useDisplay();

const transition = computed(() =>
  mobile.value ? "slide-x-reverse-transition" : "dialog-transition"
);

interface Props {
  item: Item;
}
const props = defineProps<Props>();
const { item } = toRefs(props);
const show = defineModel<boolean>();

const { items } = useItems();
const nItems = computed(() => items.value?.length ?? 0);
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 70vh;
  inline-size: 100%;
  max-inline-size: 960px;
  margin: auto;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  grid-template-areas: "top" "content" "bottom";
}

.g-mobile {
  block-size: 100%;
}

.g-top {
  grid-area: top;
}

.g-content {
  grid-area: content;
  block-size: 100%;
}

.g-bottom {
  grid-area: bottom;
}
</style>
