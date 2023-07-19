<template>
  <v-app>
    <navigation-drawer v-model="drawer"></navigation-drawer>
    <v-app-bar flat density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none">
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <router-link
          :to="{ name: 'home' }"
          class="text-decoration-none"
          style="color: inherit"
        >
          {{ title }}
        </router-link>
      </v-app-bar-title>
      <v-spacer class="d-none d-sm-block"></v-spacer>
      <router-link
        v-for="item in naviItems"
        :to="item.to"
        class="text-decoration-none mx-3 d-none d-sm-block"
        style="color: inherit"
      >
        {{ item.title }}
      </router-link>
      <v-spacer class="d-none d-sm-block"></v-spacer>
      <template v-slot:append>
        <span> {{ version }} </span>
        <v-btn icon="mdi-graphql" :href="graphqlUrl" target="_blank"> </v-btn>
      </template>
    </v-app-bar>
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
