<template>
  <div class="run-frame">
    <Suspense>
      <SubscribeRunNo v-slot="{ runNo }">
        <template v-if="runNo">
          <VFadeTransition hide-on-leave>
            <RunFrameE :key="runNo" :run-no="runNo"> </RunFrameE>
          </VFadeTransition>
        </template>
      </SubscribeRunNo>
      <template #fallback>
        <VProgressLinear indeterminate></VProgressLinear>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import RunFrameE from "./RunFrameE.vue";
import SubscribeRunNo from "./SubscribeRunNo.vue";
</script>

<style scoped>
.run-frame {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
  grid-template: 100% / 1fr;
}
</style>
