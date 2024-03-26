<template>
  <v-tabs v-model="tab" align-tabs="title" class="d-none d-sm-inline">
    <v-tab :value="item.title" :to="item.to" v-for="item in naviItems">
      <span class="text-none"> {{ item.title }} </span>
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNaviItems } from "./navi-items";
const tab = ref<string | null>(null);
const { naviItems } = useNaviItems();
</script>
