<template>
  <VAppBar color="surface-container-low">
    <template #prepend>
      <slot name="prepend" comment="slot for v-app-bar-nav-icon"> </slot>
    </template>
    <template #title>
      <RouterLink
        :to="{ name: 'home' }"
        class="text-decoration-none"
        style="color: inherit"
      >
        <span v-if="!mobile"> {{ appName }}: </span> {{ apiName }}
        <VBadge dot inline color="primary" v-if="state === 'running'"> </VBadge>
      </RouterLink>
    </template>
    <template #append>
      <template v-if="!mobile">
        <span class="mx-4"> {{ version }} </span>
        <VBtn icon="mdi-graphql" :href="apiHttp" target="_blank"> </VBtn>
        <ToggleDarkModeButton></ToggleDarkModeButton>
      </template>
      <AutoModeButton></AutoModeButton>
    </template>
    <template #extension v-if="!mobile">
      <TabNavi></TabNavi>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

import { useConfig } from "@/utils/config";
import ToggleDarkModeButton from "@/components/utils/ToggleDarkModeButtonWithTooltip.vue";
import { AutoModeButton } from "@/components/schedule";

import { useSubscribeState } from "@/api";

import TabNavi from "./TabNavi.vue";

const { mobile } = useDisplay();

const { config } = useConfig();

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => config.value.appName || "loading...");
const apiName = computed(() => config.value.apiName || "");
const apiHttp = computed(() => config.value.apiHttp);

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;
</script>
