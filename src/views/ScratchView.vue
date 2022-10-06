<template>
  <div class="g-container">
    <v-card flat min-width="400px" color="background lighten-4">
      <v-system-bar color="primary" dark>
        <span> System bar </span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-toolbar flat color="primary lighten-2" dark extension-height="36px">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Tool bar </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            align-with-title
            height="36px"
            hide-slider
            active-class="background lighten-4 primary--text"
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :ripple="false"
              class="text-none"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
          :transition="false"
          :reverse-transition="false"
        >
          <v-card-text>
            <pre>{{ item }}</pre>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card flat min-width="400px" color="background lighten-4">
      <v-system-bar color="primary" dark>
        <span> System bar </span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
      <v-tabs
        v-model="tab"
        align-with-title
        height="36px"
        hide-slider
        dark
        background-color="primary lighten-2"
        active-class="background lighten-4 primary--text"
      >
        <v-tab
          v-for="item in items"
          :key="item"
          :ripple="false"
          class="text-none"
        >
          <v-badge content="1" color="error" inline>
            {{ item }}
          </v-badge>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
          :transition="false"
          :reverse-transition="false"
        >
          <v-card-text>
            <pre>{{ item }}</pre>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tab = ref<any>(null);
const items = ref(["one", "two", "three"]);
const text = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
);
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

<style>
.v-tab::before {
  background-color: inherit;
}
</style>
