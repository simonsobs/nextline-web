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
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "@/stores/index";

export default defineComponent({
  name: "App",
  setup() {
    const graphqlUrl = ref(process.env.VUE_APP_GRAPHQL_HTTP);
    const version = ref(process.env.PACKAGE_VERSION);

    const store = useStore();

    const title = computed(() => {
      const name = store.config.apiName;
      let ret = "Nextline";
      if (name) {
        ret = `${ret}: ${name}`;
      }
      return ret;
    });

    watch(
      title,
      (val) => {
        document.title = val || "loading...";
      },
      { immediate: true }
    );

    return {
      graphqlUrl,
      version,
      title,
    };
  },
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
