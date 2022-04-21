<template>
  <div class="g-container">
    <v-card flat outlined min-width="400px">
      <v-system-bar color="primary darken-2" dark>
        <span> System bar </span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Tool bar </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <pre>{{ $vuetify.theme.currentTheme }}</pre>
        <v-btn absolute bottom right fab color="accent">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card flat outlined disabled min-width="400px">
      <v-system-bar color="primary darken-2" dark>
        <span> System bar </span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Tool bar </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="grey lighten-5"> Disabled </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Scratch",
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
