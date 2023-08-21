<template>
  <provide-config>
    <provide-urql-client>
      <app> </app>
    </provide-urql-client>
  </provide-config>
</template>

<script setup lang="ts">
import ProvideConfig from "@/utils/config/ProvideConfig.vue";
import ProvideUrqlClient from "./ProvideUrqlClient.vue";
import App from "./AppMain.vue";
</script>
