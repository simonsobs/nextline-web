<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { useRdbRunQuery } from "@/graphql/codegen/generated";

import RunCard from "@/components/History/RunCard.vue";

const route = useRoute();
const runNo = Number(route.params.runNo);

const breadcrumb = computed(() => [
  { title: "Runs", to: { name: "runs" }, exact: true },
  { title: `Run ${runNo}`, to: { name: "run", params: { runNo } } },
]);

const queryResponse = useRdbRunQuery({ variables: { runNo } });

const run = computed(() => queryResponse.data.value?.rdb.run);
</script>

<template>
  <div class="g-container">
    <div class="g-navi">
      <VBreadcrumbs :items="breadcrumb"> </VBreadcrumbs>
      <!-- <span class="pr-6">
        <VBtn icon variant="plain" :to="toPrev" v-if="toPrev">
          <VIcon> mdi-arrow-left-bold </VIcon>
        </VBtn>
        <VBtn icon variant="plain" :to="toNext" v-if="toNext">
          <VIcon> mdi-arrow-right-bold </VIcon>
        </VBtn>
      </span> -->
    </div>
    <VBtn icon variant="plain" :to="{ name: 'runs' }">
      <VIcon>mdi-arrow-left</VIcon>
    </VBtn>
    <RunCard v-if="run" class="g-card" :run="run"></RunCard>
  </div>
</template>

<style scoped>
.g-container {
  display: grid;
  padding: 12px;
  justify-content: center;
  grid-template-columns: minmax(min-content, 960px);
  grid-template-rows: min-content min-content 1fr;
  grid-template-areas: "navi" "button" "card";
}

.g-navi {
  grid-area: navi;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.g-card {
  grid-area: card;
}
</style>
