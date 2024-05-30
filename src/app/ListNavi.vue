<template>
  <VList>
    <VListItem
      link
      router
      v-for="(item, i) in naviItems"
      :key="i"
      :to="item.to"
      :exact="item.exact"
      :title="item.title"
    >
      <template v-slot:prepend="{ isActive }">
        <VIcon :icon="`${isActive ? item.icon : `${item.icon}-outline`}`"> </VIcon>
      </template>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import { useNaviItems } from "./navi-items";
const { naviItems } = useNaviItems();
</script>
