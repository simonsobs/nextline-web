<template>
  <v-layout full-height style="width: 100%">
    <!--
    v-layout-can be removed when v-system-bar is removed.
    v-layout is there to prevent the height of v-system-bar from being included
    in the padding top of v-main.
   -->
    <v-card
      flat
      height="100%"
      :ripple="false"
      tabindex="0"
      @keydown.stop.prevent.capture="keyboardEvent = $event"
      class="code-exec grey lighten-4"
      style="min-height: 0; width: 100%"
    >
      <template v-if="prompting">
        <system-bar :state="prompting"></system-bar>
        <div class="g-container">
          <cmd-col
            :traceNo="traceId"
            :promptNo="prompting.prompting"
            :disabled="!prompting.prompting"
            :keyboard-event="keyboardEvent"
          ></cmd-col>
          <v-divider></v-divider>
          <div style="height: 100%">
            <code-col :state="prompting"></code-col>
          </div>
        </div>
      </template>
    </v-card>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { usePromptingSubscription } from "@/gql/graphql";

import SystemBar from "./SystemBar.vue";
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
  height: calc(100% - 24px); /* 24px: system bar */
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(0, 1fr);
}
</style>
