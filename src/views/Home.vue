<template>
  <v-container fluid fill-height class="grey lighten-3">
    <!-- https://vuetifyjs.com/en/styles/flex/#flex-grow-and-shrink -->
    <!-- https://github.com/vuetifyjs/vuetify/issues/8906#issuecomment-531459503 -->
    <v-row class="fill-height flex-column flex-nowrap justify-start">
      <v-col class="flex-grow-0">
        <main-ctrl></main-ctrl>
      </v-col>
      <v-col v-show="exception" class="flex-grow-0">
        <exception v-model="exception"></exception>
      </v-col>
      <v-col style="min-height: 240px">
        <layout-script></layout-script>
      </v-col>
      <v-col style="max-height: 20vh">
        <stdout></stdout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainCtrl from "@/components/MainCtrl.vue";
import Stdout from "@/components/Stdout.vue";
import Exception from "@/components/Exception.vue";
import LayoutScript from "@/components/LayoutScript.vue";

export default {
  name: "Home",
  components: {
    MainCtrl,
    Stdout,
    Exception,
    LayoutScript,
  },
  data: () => ({
    exception: null,
  }),
  watch: {
    "$store.state.reset"(val) {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.exception = null;
    },
  },
};
</script>

<style>
.v-application code {
  background-color: inherit;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;
  line-height: 1.8;
}

.theme--light.v-application code {
  background-color: inherit;
}
</style>
