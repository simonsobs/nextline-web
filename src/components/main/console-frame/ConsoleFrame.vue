<template>
  <VLayout full-height style="width: 100%">
    <VCard
      flat
      color="surface-container-low px-2 pt-0 pb-2"
      rounded="0"
      class="g-container"
    >
      <VCardActions class="g-header py-1">
        <VTabs v-model="tab" density="compact">
          <VTab value="stdout">
            <span class="text-none"> stdout </span>
          </VTab>
        </VTabs>
        <VSpacer></VSpacer>
      </VCardActions>
      <VCardText id="main" class="g-content py-1">
        <pre
          class="overflow-auto">{{ data?.ctrlStdout }}<span ref="bottom"></span></pre>
      </VCardText>
    </VCard>
  </VLayout>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

import { useCtrlStdoutSSubscription } from "@/graphql/codegen/generated";

const handleSubscription = (
  messages = { ctrlStdout: "" },
  response: { ctrlStdout: string }
) => {
  nextTick(() => {
    nextTick(() => {
      if (bottom.value) bottom.value.scrollIntoView(false);
    });
  });
  return { ctrlStdout: messages.ctrlStdout + response.ctrlStdout };
};
const subscription = useCtrlStdoutSSubscription({}, handleSubscription);
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
