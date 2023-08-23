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
        <span v-if="!mobile"> {{ appName }}: </span> {{ apiName }}
      </router-link>
    </template>
    <v-spacer v-if="!mobile"></v-spacer>
    <tab-navi v-if="!mobile"></tab-navi>
    <v-spacer v-if="!mobile"></v-spacer>
    <span v-if="!mobile"> {{ version }} </span>
    <v-btn icon="mdi-graphql" :href="apiHttp" target="_blank"> </v-btn>
    <template v-slot:append>
      <toggle-dark-mode-button></toggle-dark-mode-button>
      <schedule-ctrl></schedule-ctrl>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

import { useConfig } from "@/utils/config";

import TabNavi from "./TabNavi.vue";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButton.vue";
import ScheduleCtrl from "@/components/ScheduleCtrl.vue";

const { mobile } = useDisplay();

const { config } = useConfig();

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
const apiHttp = computed(() => config.value.apiHttp);
</script>
