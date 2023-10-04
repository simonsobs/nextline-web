<template>
  <suspense-c>
    <provide-config-exe>
      <slot></slot>
    </provide-config-exe>
    <template #fallback>
      <v-progress-linear indeterminate> </v-progress-linear>
    </template>
    <template #error="{ error }">
      <v-alert variant="tonal" type="error" class="ma-2">
        {{ error }}
      </v-alert>
    </template>
  </suspense-c>
</template>

<script setup lang="ts">
import ProvideConfigExe from "./ProvideConfigExe.vue";
</script>
