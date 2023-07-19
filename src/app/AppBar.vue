<template>
  <v-app-bar flat density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" class="d-sm-none">
      </v-app-bar-nav-icon>
    </template>
    <template v-slot:title>
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none"
        style="color: inherit"
      >
        <span class="d-none d-sm-inline"> {{ appName }}: </span> {{ apiName }}
      </router-link>
    </template>
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useConfigStore } from "@/stores/config";
import naviItems from "./navi-items";

interface Emits {
  (event: "toggleDrawer"): void;
}
defineEmits<Emits>();

const configStore = useConfigStore();

const graphqlUrl = computed(() => configStore.config?.apiHttp);

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => configStore.config?.appName || "loading...");
const apiName = computed(() => configStore.config?.apiName || "");
</script>
