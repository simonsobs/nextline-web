<template>
  <v-app>
    <v-app-bar app dense flat clipped-left dark color="primary">
      <v-toolbar-title>
        <router-link
          :to="{ name: 'home' }"
          class="font-weight-bold text-decoration-none"
          style="color: inherit"
        >
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <span class="mx-5"> Main </span> -->
      <!-- <span class="mx-5"> History </span> -->
      <span class="primary--text text--lighten-3 subtitle-2">
        {{ version }}
      </span>
      <v-btn icon :href="graphqlUrl" target="_blank">
        <v-icon> mdi-graphql </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <keep-alive>
        <router-view :key="route.fullPath"></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router/composables";
import { provideClient } from "@urql/vue";

import { createUrqlClient } from "@/urql";
import { useConfigStore } from "@/stores/config";

const route = useRoute();
const configStore = useConfigStore();

const graphqlUrl = computed(() => configStore.config?.apiHttp);
if (!graphqlUrl.value) throw new Error("No graphqlUrl");

const version = ref(import.meta.env.PACKAGE_VERSION);

const title = computed(() => {
  const pre = "Nextline";
  const name = configStore.config?.apiName;
  return name ? `${pre}: ${name}` : pre;
});

watch(
  title,
  (val) => {
    document.title = val || "loading...";
  },
  { immediate: true }
);

const client = createUrqlClient(graphqlUrl.value);

provideClient(client);
</script>

<style>
#app {
  background-color: var(--v-background-lighten3);
}

html,
body,
.v-application,
.v-application--wrap,
.v-main__wrap {
  height: 100%;
}

.v-main {
  height: calc(100% - 48px); /* 48px: the height of the app bar */
}
</style>
