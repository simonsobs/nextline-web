<template>
  <VList>
    <VListItem
      v-for="(item, i) in naviItems"
      :key="i"
      link
      router
      :to="item.to"
      :exact="item.exact"
      :title="item.title"
    >
      <template #prepend="{ isActive }">
        <VIcon :icon="`${isActive ? item.icon : `${item.icon}-outline`}`"> </VIcon>
      </template>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import { useNaviItems } from "./navi-items";
const { naviItems } = useNaviItems();
</script>
