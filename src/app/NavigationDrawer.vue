<template>
  <VNavigationDrawer disable-resize-watcher comment="fallthrough attributes">
    <div class="px-8 py-5">
      <span class="text-primary font-weight-bold"> {{ appName }} : {{ apiName }} </span>
    </div>
    <ListNavi></ListNavi>
    <template #append>
      <div class="ma-4 d-flex justify-space-around align-center">
        <ToggleDarkModeButton></ToggleDarkModeButton>
        <span class="text-secondary text-body-2">v{{ version }}</span>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useConfig } from "@/utils/config";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButton.vue";
import ListNavi from "./ListNavi.vue";
const { config } = useConfig();
const version = ref(import.meta.env.PACKAGE_VERSION);
const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
</script>
