<template>
  <v-app>
    <navigation-drawer v-model="drawer"></navigation-drawer>
    <app-bar @toggle-drawer="drawer = !drawer"></app-bar>
    <v-main>
      <router-view :key="route.fullPath" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useConfigStore } from "@/stores/config";
import NavigationDrawer from "./NavigationDrawer.vue";
import AppBar from "./AppBar.vue";

const route = useRoute();
const configStore = useConfigStore();

const drawer = ref(false);

const title = computed(() => {
  const appName = configStore.config?.appName || "loading...";
  const apiName = configStore.config?.apiName || "";
  return `${appName}: ${apiName}`;
});

watchEffect(() => {
  document.title = title.value || "loading...";
});
</script>

<style>
html,
body,
#app,
.v-application,
.v-application__wrap,
.v-main__wrap {
  height: 100%;
}

.v-main {
  height: calc(100% - 48px); /* 48px: the height of the app bar */
}

.v-btn {
  text-transform: capitalize;
}
</style>
