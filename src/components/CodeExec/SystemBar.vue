<template>
  <v-system-bar dark :color="this.state.prompting ? 'primary' : 'grey'">
    <v-icon> mdi-language-python </v-icon>
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
    basename() {
      if (!this.state) return null;
      return path.basename(this.state.fileName);
    },
  },
};
</script>

<style></style>
