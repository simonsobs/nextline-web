<template>
  <VApp>
    <Suspense>
      <ProvideConfig>
        <ProvideColorTheme>
          <App></App>
        </ProvideColorTheme>
      </ProvideConfig>
      <template #fallback>
        <div class="progress-container">
          <VProgressLinear indeterminate> </VProgressLinear>
        </div>
      </template>
    </Suspense>
  </VApp>
</template>

<script setup lang="ts">
import ProvideConfig from "@/utils/config/ProvideConfig.vue";

import App from "./AppMain.vue";
import ProvideColorTheme from "./ProvideColorTheme.vue";
</script>

<style scoped>
.progress-container {
  height: 100%;
  display: grid;
  place-items: center;
}

.progress-container > * {
  width: min(61.8%, 390px);
}
</style>
