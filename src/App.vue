<template>
  <v-app>
    <v-app-bar app dense flat clipped-left class="primary on-primary--text">
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Home' }"
          class="font-weight-bold text-decoration-none"
          style="color: inherit"
        >
          Nextline
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mx-5"> Main </span>
      <span class="mx-5"> History </span>
      <v-btn icon :href="graphqlUrl" target="_blank">
        <v-icon color="on-primary"> mdi-graphql </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      graphqlUrl: process.env.VUE_APP_GRAPHQL_HTTP,
    };
  },
};
</script>

<style>
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
