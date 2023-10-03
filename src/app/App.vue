<template>
  <v-app>
    <provide-config>
      <app> </app>
    </provide-config>
  </v-app>
</template>

<script setup lang="ts">
import ProvideConfig from "@/utils/config/ProvideConfig.vue";
import App from "./AppMain.vue";
</script>
