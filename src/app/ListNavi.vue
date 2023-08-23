<template>
  <v-list>
    <v-list-item
      link
      router
      v-for="(item, i) in naviItems"
      :key="i"
      :to="item.to"
      :exact="item.exact"
      :title="item.title"
    >
      <template v-slot:prepend="{ isActive }">
        <v-icon :icon="`${isActive ? item.icon : `${item.icon}-outline`}`">
        </v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useNaviItems } from "./navi-items";
const { naviItems } = useNaviItems();
</script>
