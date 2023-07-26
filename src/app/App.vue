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
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useSetTitle } from "./set-title";

import NavigationDrawer from "./NavigationDrawer.vue";
import AppBar from "./AppBar.vue";

const route = useRoute();
const drawer = ref(false);

useSetTitle();
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
