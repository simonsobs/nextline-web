<template>
  <div class="top-bar">
    <SpanRunNoState></SpanRunNoState>
    <Component :is="actionComponent" v-if="actionComponent"></Component>
  </div>
</template>

<script setup lang="ts">
import SpanRunNoState from "./SpanRunNoState.vue";
import { useActionComponent } from "./action-component";
const { actionComponent } = await useActionComponent();
</script>

<style scoped>
.top-bar {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: center;
  column-gap: 4px;
  min-height: 38px;
}
</style>
