<template>
  <v-dialog v-model="show" :fullscreen="mobile" :transition="transition">
    <v-sheet class="g-container pa-4" :class="{ 'g-mobile': mobile }">
      <div class="g-top d-flex" v-if="mobile">
        <v-btn
          variant="text"
          size="small"
          icon="mdi-close"
          @click="show = false"
        ></v-btn>
      </div>
      <div class="g-content">
        <item-view :item="item"> </item-view>
      </div>
      <div class="g-bottom d-flex" v-if="!mobile">
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="show = false">Close</v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import ItemView from "./ItemView.vue";
import type { Item } from "./items";

const { mobile } = useDisplay();

const transition = computed(() =>
  mobile.value ? "slide-x-reverse-transition" : "dialog-transition"
);

interface Props {
  item: Item;
}
defineProps<Props>();
const show = defineModel<boolean>();
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
