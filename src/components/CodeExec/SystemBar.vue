<template>
  <v-system-bar dark :color="state.prompting ? 'primary' : 'grey'">
    <v-icon> mdi-language-python </v-icon>
    <v-tooltip bottom open-delay="500">
      <template v-slot:activator="{ props }">
        <span v-bind="props">{{ basename }}</span>
      </template>
      <span>{{ state.fileName }}</span>
    </v-tooltip>
  </v-system-bar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import path from "path";

import { PromptingData } from "@/gql/graphql";

interface Props {
  state: PromptingData;
}

const props = defineProps<Props>();

const basename = computed(() => path.basename(props.state.fileName));
</script>
