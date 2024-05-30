<template>
  <VApp>
    <Suspense>
      <ProvideConfig>
        <App></App>
      </ProvideConfig>
      <template #fallback>
        <VProgressLinear indeterminate> </VProgressLinear>
      </template>
    </Suspense>
  </VApp>
</template>

<script setup lang="ts">
import ProvideConfig from "@/utils/config/ProvideConfig.vue";
import App from "./AppMain.vue";
</script>
