<template>
  <v-layout full-height style="width: 100%">
    <v-card
      flat
      :ripple="false"
      tabindex="0"
      @keydown.capture="keyboardEvent = $event"
      class="g-container code-exec bg-grey-lighten-4"
      rounded="0"
    >
      <template v-if="prompting">
        <div class="g-content">
          <code-col :state="prompting"></code-col>
        </div>
        <div class="g-header">
          <v-card-text v-if="basename">
            <v-tooltip bottom open-delay="500">
              <template v-slot:activator="{ props }">
                <span v-bind="props">{{ basename }}</span>
              </template>
              <span>{{ prompting.fileName }}</span>
            </v-tooltip>
          </v-card-text>
          <cmd-col
            :traceNo="traceId"
            :promptNo="prompting.prompting"
            :disabled="!prompting.prompting"
            :keyboard-event="keyboardEvent"
          ></cmd-col>
        </div>
      </template>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import path from "path";

import { usePromptingSubscription } from "@/gql/graphql";

import CmdCol from "./CmdCol.vue";
import CodeCol from "./CodeCol.vue";

interface Props {
  traceId: number;
}

const props = defineProps<Props>();

const keyboardEvent = ref<KeyboardEvent | null>(null);

const subscription = usePromptingSubscription({
  variables: { traceId: props.traceId },
});

const prompting = computed(() => subscription.data.value?.prompting);

const basename = computed(() => {
  const fileName = prompting?.value?.fileName || "";
  return fileName === "<string>" ? "" : path.basename(fileName);
});

watch(keyboardEvent, (val) => {
  // console.log(val);
});

watch(prompting, (val) => {
  // console.log(document.activeElement);
});
</script>

<style scoped>
.code-exec {
  cursor: default;
}

.code-exec:before {
  background: inherit; /* prevent highlight when focused */
}
.g-container {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(0, 1fr) min-content;
  grid-template-areas: "content" "header";
}

.g-content {
  grid-area: content;
  block-size: 100%;
}

.g-header {
  grid-area: header;
}
</style>
