<template>
  <v-app-bar color="surface-container-low">
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
    <span class="d-none d-sm-inline"> {{ version }} </span>
    <v-btn icon="mdi-graphql" :href="apiHttp" target="_blank"> </v-btn>
    <template v-slot:append>
      <toggle-dark-mode-button></toggle-dark-mode-button>
      <schedule-ctrl></schedule-ctrl>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useConfig } from "@/utils/config";
import naviItems from "./navi-items";
import ScheduleCtrl from "@/components/ScheduleCtrl.vue";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButton.vue";

interface Emits {
  (event: "toggleDrawer"): void;
}
defineEmits<Emits>();

const { config } = useConfig();

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
const apiHttp = computed(() => config.value.apiHttp);
</script>
