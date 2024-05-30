<template>
  <div class="g-container">
    <VSwitch
      v-model="isDevToolEnabled"
      inset
      :label="label"
      color="primary"
    ></VSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDevTool } from "@/utils/dev/enabled";

const { isDevToolEnabled } = useDevTool();
const label = ref("Dev Tool");
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  place-items: center;
}

.g-container > div {
  text-align: center;
}
</style>
