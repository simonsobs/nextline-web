<template>
  <v-app>
    <navigation-drawer v-model="drawer"></navigation-drawer>
    <app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" v-if="mobile">
        </v-app-bar-nav-icon>
      </template>
    </app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
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
import { ref, watchEffect, toValue } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import { useProvideClient } from "@/graphql/urql";
import { useColorTheme } from "@/utils/color-theme";
import { useSetTitle } from "./set-title";

import NavigationDrawer from "./NavigationDrawer.vue";
import AppBar from "./AppBar.vue";

const route = useRoute();

const { mobile } = useDisplay();
const drawer = ref(false);

watchEffect(() => {
  if (toValue(mobile)) return;
  drawer.value = false;
});

useProvideClient();
useColorTheme();
useSetTitle();
</script>

<style>
.v-main {
  height: calc(100% - var(--v-layout-top));
  /* --v-layout-top is the height of the app bar */
  overflow-y: scroll;
}
</style>
