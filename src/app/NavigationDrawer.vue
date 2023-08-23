<template>
  <v-navigation-drawer disable-resize-watcher comment="fallthrough attributes">
    <div class="px-8 py-5">
      <span class="text-primary font-weight-bold"> {{ appName }} </span>
    </div>
    <list-navi></list-navi>
    <template v-slot:append>
      <div class="ma-4 d-flex justify-space-around align-center">
        <span class="text-secondary text-body-2">v{{ version }}</span>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useConfig } from "@/utils/config";
import ListNavi from "./ListNavi.vue";
const { config } = useConfig();
const version = ref(import.meta.env.PACKAGE_VERSION);
const appName = computed(() => config.value.appName || "loading...");
</script>
