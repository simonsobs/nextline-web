<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keydown.stop.prevent.capture="keyboardEvent = $event"
    class="code-exec grey lighten-4"
    style="min-height: 0"
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
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useSubscription } from "@urql/vue";

import SUBSCRIBE_PROMPTING from "@/graphql/subscriptions/Prompting.gql";

import SystemBar from "./SystemBar.vue";
import CmdCol from "./CmdCol.vue";
import CodeCol from "./CodeCol.vue";

interface PromptingData {
  prompting: number;
  fileName: string;
  lineNo: number;
  traceEvent: string;
}

export default defineComponent({
  name: "CodeExec",
  components: {
    SystemBar,
    CmdCol,
    CodeCol,
  },
  props: { traceId: { type: Number, required: true } },
  setup(props) {
    const prompting = ref<PromptingData | null | undefined>(null);
    const keyboardEvent = ref<KeyboardEvent | null>(null);

    const subscription = useSubscription<
      { prompting: PromptingData },
      { prompting: PromptingData },
      { traceId: number }
    >({
      query: SUBSCRIBE_PROMPTING,
      variables: { traceId: props.traceId },
    });

    watch(subscription.data, (val) => {
      prompting.value = val?.prompting;
    });

    watch(keyboardEvent, (val) => {
      // console.log(val);
    });

    watch(prompting, (val) => {
      // console.log(document.activeElement);
    });

    return {
      prompting,
      keyboardEvent,
    };
  },
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
