<template>
  <div v-if="error">
    <v-alert variant="tonal" type="error" class="ma-2">
      {{ error }}
    </v-alert>
  </div>
  <suspense v-else>
    <provide-config-exe>
      <slot></slot>
    </provide-config-exe>
    <template #fallback>
      <v-progress-linear indeterminate> </v-progress-linear>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import ProvideConfigExe from "./ProvideConfigExe.vue";

const error = ref<Error>();

onErrorCaptured((e, instance, info) => {
  console.error(e, instance, info);
  error.value = e;
  return false;
});
</script>
