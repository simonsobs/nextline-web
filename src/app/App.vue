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
import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
} from "@urql/core";
// import { createClient as createWSClient } from "graphql-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { provideClient } from "@urql/vue";
import { useConfigStore } from "@/stores/config";

const route = useRoute();
const configStore = useConfigStore();

// https://formidable.com/open-source/urql/docs/advanced/subscriptions/
// https://github.com/enisdenjo/graphql-ws/blob/master/README.md
// https://github.com/apollographql/subscriptions-transport-ws/blob/master/README.md
// TODO: switch to graphql-ws as subscriptions-transport-ws is no longer maintained.
// However, graphql-ws doesn't seem to work with urql at the moment:
// https://qiita.com/mu-suke08/items/6dc353dd641e352f350e

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

// WebSocket endpoint. "ws://" for "http://" and "wss://" for "https://"
const wsEndpoint = graphqlUrl.value.replace(/^http/i, "ws");

// // for graphql-ws
// const wsClient = createWSClient({
//   url: wsEndpoint,
// });

const subscriptionClient = new SubscriptionClient(wsEndpoint, {
  reconnect: true,
});

function createUrqlClient(url: string) {
  return createClient({
    url: url,
    requestPolicy: "network-only",
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: (operation) =>
          subscriptionClient.request(operation),
        // // for graphql-ws
        // forwardSubscription: (operation) => ({
        //   subscribe: (sink) => ({
        //     unsubscribe: wsClient.subscribe(operation, sink),
        //   }),
        // }),
      }),
    ],
  });
}

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
