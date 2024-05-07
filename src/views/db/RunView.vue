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
      <v-breadcrumbs :items="breadcrumb"> </v-breadcrumbs>
      <!-- <span class="pr-6">
        <v-btn icon variant="plain" :to="toPrev" v-if="toPrev">
          <v-icon> mdi-arrow-left-bold </v-icon>
        </v-btn>
        <v-btn icon variant="plain" :to="toNext" v-if="toNext">
          <v-icon> mdi-arrow-right-bold </v-icon>
        </v-btn>
      </span> -->
    </div>
    <v-btn icon variant="plain" :to="{ name: 'runs' }">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <run-card v-if="run" class="g-card" :run="run"></run-card>
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
