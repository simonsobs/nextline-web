<template>
  <v-app>
    <navigation-drawer v-model="drawer"></navigation-drawer>
    <app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleDrawer()" v-if="mobile">
        </v-app-bar-nav-icon>
      </template>
    </app-bar>
    <v-main>
      <router-view v-slot="{ Component, route }">
        <v-fade-transition>
          <keep-alive>
            <component :key="route.fullPath" :is="Component" />
          </keep-alive>
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

import { useProvideClient } from "@/graphql/urql";
import { useColorTheme } from "@/utils/color-theme";
import { useSetTitle } from "./set-title";
import { useDrawer } from "./drawer";

import NavigationDrawer from "./NavigationDrawer.vue";
import AppBar from "./AppBar.vue";

useProvideClient();
useColorTheme();
useSetTitle();
const { mobile } = useDisplay();
const { drawer, toggleDrawer } = useDrawer();
</script>

<style>
.v-main {
  height: calc(100% - var(--v-layout-top));
  /* --v-layout-top is the height of the app bar */
  overflow-y: scroll;
}
</style>
