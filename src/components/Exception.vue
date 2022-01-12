<template>
  <v-alert type="error" class="my-2">
    <pre
      v-text="exception"
      style="white-space: pre-wrap; overflow-wrap: anywhere"
    ></pre>
  </v-alert>
</template>

<script>
import QUERY_EXCEPTION from "@/graphql/queries/Exception.gql";
import SUBSCRIBE_GLOBAL_STATE from "@/graphql/subscriptions/GlobalState.gql";

export default {
  name: "Exception",
  props: {
    value: String,
  },
  data() {
    return {
      nextlineState: null,
      exception: this.value,
    };
  },
  apollo: {
    exception: {
      query: QUERY_EXCEPTION,
      skip() {
        return this.nextlineState != "finished";
      },
      update(data) {
        return data.exception;
      },
    },
    $subscribe: {
      nextlineState: {
        query: SUBSCRIBE_GLOBAL_STATE,
        result({ data }) {
          this.nextlineState = data.globalState;
        },
      },
    },
  },
  watch: {
    "$store.state.reset"() {
      this.exception = null;
    },
    value() {
      this.exception = this.value;
    },
    exception: {
      handler(val) {
        this.$emit("input", val);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
