<template>
  <v-app>
    <suspense>
      <provide-config>
        <app></app>
      </provide-config>
      <template #fallback>
        <v-progress-linear indeterminate> </v-progress-linear>
      </template>
    </suspense>
  </v-app>
</template>

<script setup lang="ts">
import ProvideConfig from "@/utils/config/ProvideConfig.vue";
import App from "./AppMain.vue";
</script>
