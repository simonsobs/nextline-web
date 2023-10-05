<template>
  <div class="run-frame">
    <suspense>
      <subscribe-run-no v-slot="{ runNo }">
        <template v-if="runNo">
          <v-fade-transition>
            <run-frame-e :key="runNo"> </run-frame-e>
          </v-fade-transition>
        </template>
      </subscribe-run-no>
      <template #fallback>
        <v-progress-linear indeterminate></v-progress-linear>
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import SubscribeRunNo from "./SubscribeRunNo.vue";
import RunFrameE from "./RunFrameE.vue";
</script>

<style scoped>
.run-frame {
  display: grid;
  block-size: 100%;
  inline-size: 100%;
}
</style>
