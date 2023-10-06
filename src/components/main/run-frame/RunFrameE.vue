<template>
  <div class="run-frame-e">
    <div class="g-ctrl">
      <top-bar></top-bar>
    </div>
    <div v-show="exception" class="g-exception">
      <exception v-model="exception"></exception>
    </div>
    <div class="g-trace-frames">
      <trace-frames></trace-frames>
    </div>
    <div class="g-stdout">
      <console-frame></console-frame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TopBar from "./top-bar/TopBar.vue";
import ConsoleFrame from "@/components/main/console-frame/ConsoleFrame.vue";
import Exception from "@/components/exception/Exception.vue";
import TraceFrames from "@/components/main/trace-frame/Layout.vue";

const exception = ref(false);

interface Props {
  runNo: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
.run-frame-e {
  display: grid;
  margin: 8px;
  block-size: calc(100% - 2 * 8px);
  inline-size: calc(100% - 2 * 8px);
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(240px, 1fr) minmax(
      100px,
      25vh
    );
  grid-template-areas: "ctrl" "exception" "traces" "stdout";
  row-gap: 8px;
}
.g-ctrl {
  grid-area: ctrl;
}
.g-exception {
  grid-area: exception;
}
.g-trace-frames {
  grid-area: traces;
}
.g-stdout {
  grid-area: stdout;
}
</style>
