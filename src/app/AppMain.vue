<template>
  <div class="app-main">
    <div class="banner">
      <Banner></Banner>
    </div>
    <div class="app">
      <NavigationDrawer v-model="drawer"></NavigationDrawer>
      <AppBar :absolute="true">
        <template v-slot:prepend>
          <VAppBarNavIcon @click="toggleDrawer()" v-if="mobile"> </VAppBarNavIcon>
        </template>
      </AppBar>
      <VMain>
        <RouterView v-slot="{ Component, route }">
          <template v-if="Component">
            <VFadeTransition leave-absolute>
              <KeepAlive>
                <Component :key="route.fullPath" :is="Component"></Component>
              </KeepAlive>
            </VFadeTransition>
          </template>
        </RouterView>
      </VMain>
    </div>
  </div>
</template>
<!-- Note on transition and keep-alive:

The v-fade-transition component has options leave-absolute and hide-on-leave.

The combination of leave-absolute and keep-alive should work. However, the
component content might shift before the transition starts unless the
component's CSS is carefully designed. This shift can be quite distracting.

If that happens, instead of leave-absolute, hide-on-leave can be useful. However,
hide-on-leave doesn't work with keep-alive because the component content will
stay hidden.
-->

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
