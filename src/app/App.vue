<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary disable-resize-watcher>
      <v-card flat>
        <!-- <v-app-bar dense flat dark class="primary lighten-1 font-weight-bold">
          {{ title }}
        </v-app-bar> -->
        <template v-slot:prepend>
          <v-list>
            <v-list-item :title="title" density="compact"> </v-list-item>
          </v-list>
        </template>
        <v-list>
          <v-list-item
            link
            router
            v-for="(item, i) in naviItems"
            :key="i"
            :to="item.to"
            :exact="item.exact"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="drawer = false"
          >
          </v-list-item>
        </v-list>
      </v-card>
      <template v-slot:append>
        <v-list>
          <v-list-item :title="`v${version}`" disabled> </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar flat clipped-left dark color="primary" density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-2">
        <router-link
          :to="{ name: 'home' }"
          class="font-weight-bold text-decoration-none"
          style="color: inherit"
        >
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <router-link
        v-for="item in naviItems"
        :to="item.to"
        class="text-decoration-none mx-3 d-none d-sm-block"
        style="color: inherit"
      >
        {{ item.title }}
      </router-link>
      <v-spacer></v-spacer>
      <span class="primary--text text--lighten-3 subtitle-2">
        {{ version }}
      </span>
      <v-btn icon :href="graphqlUrl" target="_blank">
        <v-icon> mdi-graphql </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view :key="route.fullPath" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <!-- <keep-alive>
        <router-view :key="route.fullPath"></router-view>
      </keep-alive> -->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useConfigStore } from "@/stores/config";

const route = useRoute();
const configStore = useConfigStore();

const drawer = ref(false);

const naviItems = ref([
  {
    icon: "mdi-home",
    title: "Main",
    to: { name: "home" },
    exact: true,
  },
  {
    icon: "mdi-history",
    title: "History",
    to: { name: "runs" },
    exact: false,
  },
]);

const graphqlUrl = computed(() => configStore.config?.apiHttp);

const version = ref(import.meta.env.PACKAGE_VERSION);

const title = computed(() => {
  const pre = "Nextline";
  const name = configStore.config?.apiName;
  return name ? `${pre}: ${name}` : pre;
});

watchEffect(() => {
  document.title = title.value || "loading...";
});
</script>

<style>
/* #app {
  background-color: var(--v-background-lighten3);
} */

html,
body,
#app,
.v-application,
.v-application__wrap,
.v-application--wrap,
.v-main__wrap {
  height: 100%;
}

.v-main {
  height: calc(100% - 48px); /* 48px: the height of the app bar */
}
</style>
