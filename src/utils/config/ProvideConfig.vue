<template>
  <suspense>
    <provide-config-exe>
      <slot></slot>
    </provide-config-exe>
    <template #fallback>
      <v-progress-linear indeterminate> </v-progress-linear>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import ProvideConfigExe from "./ProvideConfigExe.vue";
</script>
