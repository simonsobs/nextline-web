<template>
  <suspense-c>
    <provide-config-exe>
      <slot></slot>
    </provide-config-exe>
    <template #fallback>
      <v-progress-linear indeterminate> </v-progress-linear>
    </template>
    <template #error="{ error }">
      <div>
        <v-alert variant="tonal" type="error" class="ma-2">
          {{ error }}
        </v-alert>
      </div>
    </template>
  </suspense-c>
</template>

<script setup lang="ts">
import ProvideConfigExe from "./ProvideConfigExe.vue";
</script>
