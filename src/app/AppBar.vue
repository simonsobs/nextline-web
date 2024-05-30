<template>
  <v-app-bar color="surface-container-low">
    <template #prepend>
      <slot name="prepend" comment="slot for v-app-bar-nav-icon"> </slot>
    </template>
    <template #title>
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none"
        style="color: inherit"
      >
        <span v-if="!mobile"> {{ appName }}: </span> {{ apiName }}
      </router-link>
    </template>
    <template #append>
      <template v-if="!mobile">
        <span class="mx-4"> {{ version }} </span>
        <v-btn icon="mdi-graphql" :href="apiHttp" target="_blank"> </v-btn>
        <toggle-dark-mode-button></toggle-dark-mode-button>
      </template>
      <auto-mode-button></auto-mode-button>
    </template>
    <template #extension v-if="!mobile">
      <tab-navi></tab-navi>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

import { useConfig } from "@/utils/config";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButtonWithTooltip.vue";
import AutoModeButton from "@/components/auto-mode-button/AutoModeButton.vue";

import TabNavi from "./TabNavi.vue";

const { mobile } = useDisplay();

const { config } = useConfig();

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
const apiHttp = computed(() => config.value.apiHttp);
</script>
