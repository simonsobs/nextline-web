<template>
  <v-system-bar :class="classes">
    <v-icon :class="classes"> mdi-language-python </v-icon>
    <v-tooltip bottom open-delay="500">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ basename }}</span>
      </template>
      <span>{{ state.fileName }}</span>
    </v-tooltip>
  </v-system-bar>
</template>

<script>
const path = require("path");

export default {
  name: "SystemBar",
  props: {
    state: Object,
  },
  computed: {
    classes() {
      return this.state.prompting
        ? ["primary", "on-primary--text"]
        : [];
    },
    basename() {
      if (!this.state) return null;
      return path.basename(this.state.fileName);
    },
  },
};
</script>

<style>
</style>