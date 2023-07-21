<template>
  <v-layout full-height style="width: 100%">
    <v-card
      flat
      color="surface-darken-1 px-2 pt-0 pb-2"
      rounded="0"
      class="g-container"
    >
      <v-card-actions class="g-header py-1">
        <span class="text-body-2 font-weight-medium"> stdout </span>
        <v-spacer></v-spacer>
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eraser"
              density="compact"
              :disabled="!data?.stdout"
              @click="clear"
            >
            </v-btn>
          </template>
          <span>Clear</span>
        </v-tooltip>
      </v-card-actions>
      <v-card-text id="main" class="g-content bg-surface-lighten-1 py-1">
        <pre
          class="overflow-auto">{{ data?.stdout }}<span ref="bottom"></span></pre>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

import { useStdoutSubscription } from "@/gql/graphql";

const handleSubscription = (
  messages = { stdout: "" },
  response: { stdout: string }
) => {
  nextTick(() => {
    nextTick(() => {
      if (bottom.value) bottom.value.scrollIntoView(false);
    });
  });
  return { stdout: messages.stdout + response.stdout };
};
const subscription = useStdoutSubscription({}, handleSubscription);
function clear() {
  if (subscription.data?.value) subscription.data.value.stdout = "";
}
const bottom = ref(null as HTMLElement | null);
const data = ref(subscription.data);
</script>

<style scoped>
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content minmax(24px, 1fr);
  grid-template-areas: "header" "content";
}

.g-header {
  grid-area: header;
  min-block-size: min-content; /* override v-card-actions */
  block-size: min-content;
}

.g-content {
  grid-area: content;
}

.g-content > pre {
  block-size: 100%;
}
</style>
