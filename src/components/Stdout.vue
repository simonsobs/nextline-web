<template>
  <v-card flat height="100%" color="background lighten-4">
    <v-system-bar color="primary" dark>
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

<script lang="ts">
import { defineComponent } from "vue";
import SUBSCRIBE_STDOUT from "@/graphql/subscriptions/Stdout.gql";

export default defineComponent({
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
      const target_ref_name = "stdout-bottom";
      const target = this.$refs[target_ref_name];
      if (!target) return;
      (target as Element).scrollIntoView(false);
    },
    clear() {
      this.stdout = "";
    },
  },
});
</script>
