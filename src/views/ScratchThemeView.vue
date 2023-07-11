<template>
  <div class="g-container">
    <v-layout>
      <v-card flat min-width="400px" color="background-lighten-4">
        <v-system-bar color="primary" dark style="position: static">
          <span> System bar </span>
          <v-spacer></v-spacer>
          <v-icon>mdi-minus</v-icon>
          <v-icon>mdi-checkbox-blank-outline</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-system-bar>
        <v-toolbar flat color="primary-lighten-2" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title> Tool bar </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <pre>{{ $vuetify.theme.currentTheme }}</pre>
          <v-btn absolute bottom right fab color="accent">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-layout>
      <v-card flat disabled min-width="400px" color="background-lighten-4">
        <v-system-bar color="primary" dark style="position: static">
          <span> System bar </span>
          <v-spacer></v-spacer>
          <v-icon>mdi-minus</v-icon>
          <v-icon>mdi-checkbox-blank-outline</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-system-bar>
        <v-toolbar flat color="primary-lighten-4" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title> Tool bar </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="bg-grey-lighten-5"> Disabled </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "ScratchThemeView",
};
</script>

<style scoped>
.g-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 6px;
  justify-items: center;
  align-items: start;
  align-content: space-around;
}
</style>
