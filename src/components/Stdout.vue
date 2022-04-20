<template>
  <v-card flat height="100%" class="grey lighten-5">
    <v-system-bar>
      <v-icon>mdi-window-maximize</v-icon>
      <span>stdout</span>
      <v-spacer></v-spacer>
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            x-small
            :disabled="!stdout"
            @click="clear"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-eraser</v-icon>
          </v-btn>
        </template>
        <span>Clear</span>
      </v-tooltip>
    </v-system-bar>
    <!-- <v-app-bar dense flat color="secondary"></v-app-bar> -->
    <v-card-text style="height: calc(100% - 24px)" class="py-1">
      <pre
        style="height: 100%"
        class="overflow-auto"
        ref="col-stdout">{{ stdout }}<span ref="stdout-bottom"></span></pre>
    </v-card-text>
  </v-card>
</template>

<script>
import SUBSCRIBE_STDOUT from "@/graphql/subscriptions/Stdout.gql";

export default {
  name: "Stdout",
  data() {
    return {
      stdout: "",
    };
  },
  apollo: {
    $subscribe: {
      stdout: {
        query: SUBSCRIBE_STDOUT,
        result({ data }) {
          this.stdout += data.stdout;
        },
      },
    },
  },
  watch: {
    stdout: {
      handler() {
        this.$nextTick(this.scrollStdout);
      },
      immediate: true,
    },
  },
  methods: {
    scrollStdout() {
      const container_ref_name = "col-stdout";
      const target_ref_name = "stdout-bottom";

      const container = this.$refs[container_ref_name];
      if (!container) return;

      const target = this.$refs[target_ref_name];
      if (!target) return;

      this.$vuetify.goTo(target, { container, duration: 0 });
      // this.$vuetify.goTo(99999, { container });
    },
    clear() {
      this.stdout = "";
    },
  },
};
</script>

<style></style>
