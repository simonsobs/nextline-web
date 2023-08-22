<template>
  <v-app-bar color="surface-container-low">
    <template v-slot:prepend>
      <slot name="prepend" comment="slot for v-app-bar-nav-icon"> </slot>
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
    <v-tabs v-model="tab" class="d-none d-sm-inline">
      <v-tab :value="item.title" :to="item.to" v-for="item in naviItems">
        <span class="text-none"> {{ item.title }} </span>
      </v-tab>
    </v-tabs>
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
import { useNaviItems } from "./navi-items";
import ScheduleCtrl from "@/components/ScheduleCtrl.vue";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButton.vue";

const { config } = useConfig();

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
const apiHttp = computed(() => config.value.apiHttp);

const tab = ref<string | null>(null);
const { naviItems } = useNaviItems();
</script>
