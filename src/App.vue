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
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapStores } from "pinia";
import { useStore } from "@/stores/index";

export default Vue.extend({
  name: "App",
  data() {
    return {
      graphqlUrl: process.env.VUE_APP_GRAPHQL_HTTP,
      version: process.env.PACKAGE_VERSION,
    };
  },
  computed: {
    title() {
      let title = "Nextline";
      const name = this.mainStore.config.apiName;
      if (name) {
        title = `${title}: ${name}`;
      }
      return title;
    },
    ...mapStores(useStore),
  },
  watch: {
    title: {
      immediate: true,
      handler(val) {
        document.title = val || "loading...";
      },
    },
  }
});
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
