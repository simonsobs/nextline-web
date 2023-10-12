<template>
  <div class="app-main">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="app">
      <navigation-drawer v-model="drawer"></navigation-drawer>
      <app-bar :absolute="true">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="toggleDrawer()" v-if="mobile">
          </v-app-bar-nav-icon>
        </template>
      </app-bar>
      <v-main>
        <router-view v-slot="{ Component, route }">
          <template v-if="Component">
            <v-fade-transition leave-absolute>
              <keep-alive>
                <component :key="route.fullPath" :is="Component"></component>
              </keep-alive>
            </v-fade-transition>
          </template>
        </router-view>
      </v-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

import { useProvideClient } from "@/graphql/urql";
import { useColorTheme } from "@/utils/color-theme";
import { useSetTitle } from "./set-title";
import { useDrawer } from "./drawer";

import Banner from "./Banner.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import AppBar from "./AppBar.vue";

useProvideClient();
useColorTheme();
useSetTitle();
const { mobile } = useDisplay();
const { drawer, toggleDrawer } = useDrawer();

globalThis.addEventListener("unhandledrejection", (event) => {
  console.error(event);
});
</script>

<style scoped>
.app-main {
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content minmax(240px, 1fr);
  grid-template-areas: "banner" "app";
}

.banner {
  grid-area: banner;
}

.app {
  grid-area: app;
  position: relative;
  height: 100%;
}

.v-main {
  height: 100%;
  /* height: calc(100% - var(--v-layout-top)); */
  /* --v-layout-top is the height of the app bar */
  overflow-y: scroll;
}
</style>
