<template>
  <v-card outlined flat height="100%" class="grey lighten-5">
    <v-card-text style="height: 100%" class="py-1">
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
    "$store.state.reset"() {
      this.stdout = "";
    },
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
  },
};
</script>

<style>
</style>