<template>
  <div>
    <div id="main">
      <span-run-no-state></span-run-no-state>
      <component :is="actionComponent" v-if="actionComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpanRunNoState from "./SpanRunNoState.vue";
import { useActionComponent } from "./action-component";
const { actionComponent } = useActionComponent();
</script>

<style scoped>
#main {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: center;
  column-gap: 4px;
  min-height: 38px;
}
</style>
