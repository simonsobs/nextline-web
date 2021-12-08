<template>
  <v-app>
    <v-app-bar
      app
      dense
      flat
      clipped-left
      class="primary on-primary--text"
    >
      <v-toolbar-title>
        <router-link
          to="/"
          class="font-weight-bold text-decoration-none"
          style="color: inherit"
        >
          Nextline
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :href="graphqlUrl" target="_blank">
        <v-icon color="on-primary">mdi-graphql</v-icon>
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
  data: () => ({
    graphqlUrl: process.env.VUE_APP_GRAPHQL_HTTP,
  }),
};
</script>
