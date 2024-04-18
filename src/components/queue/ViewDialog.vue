<template>
  <v-dialog v-model="show" :fullscreen="mobile" :transition="transition">
    <v-sheet class="g-mobile pa-4" v-if="mobile">
      <div class="g-top d-flex">
        <v-btn
          variant="text"
          size="small"
          icon="mdi-close"
          @click="show = false"
        ></v-btn>
      </div>
      <div class="g-content" style="block-size: 100%">
        <item-view :item="item"> </item-view>
      </div>
    </v-sheet>
    <v-sheet class="g-not-mobile pa-4" v-if="!mobile">
      <div class="g-content">
        <item-view :item="item"> </item-view>
      </div>
      <div class="g-bottom d-flex">
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
.g-mobile {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-areas: "top" "content";
}

.g-mobile > .g-top {
  grid-area: top;
}

.g-mobile > .g-content {
  grid-area: content;
  block-size: 100%;
}

.g-not-mobile {
  display: grid;
  block-size: 70vh;
  inline-size: 100%;
  row-gap: 24px;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(0, 1fr) min-content;
  grid-template-areas: "content" "bottom";
}

.g-not-mobile > .g-content {
  grid-area: content;
  block-size: 100%;
}

.g-not-mobile > .g-bottom {
  grid-area: bottom;
}

</style>
