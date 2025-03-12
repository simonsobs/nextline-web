<template>
  <VTabs v-model="tab" align-tabs="title" class="d-none d-sm-inline">
    <VTab v-for="item in naviItems" :value="item.title" :to="item.to">
      <span class="text-none"> {{ item.title }} </span>
    </VTab>
  </VTabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useNaviItems } from "./navi-items";
const tab = ref<string | null>(null);
const { naviItems } = useNaviItems();
</script>
