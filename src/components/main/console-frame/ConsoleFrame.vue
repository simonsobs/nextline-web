<template>
  <v-layout full-height style="width: 100%">
    <v-card
      flat
      color="surface-container-low px-2 pt-0 pb-2"
      rounded="0"
      class="g-container"
    >
      <v-card-actions class="g-header py-1">
        <v-tabs v-model="tab" density="compact">
          <v-tab value="stdout">
            <span class="text-none"> stdout </span>
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text id="main" class="g-content py-1">
        <pre
          class="overflow-auto">{{ data?.stdout }}<span ref="bottom"></span></pre>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

import { useStdoutSubscription } from "@/graphql/codegen/generated";

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
const bottom = ref(null as HTMLElement | null);
const data = ref(subscription.data);

const tab = ref("stdout");
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
