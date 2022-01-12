<template>
  <v-alert v-model="alert" dismissible type="error" class="my-2">
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
    value: Boolean,
  },
  data() {
    return {
      nextlineState: null,
      alert: this.value,
      exception: null,
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
      this.alert = this.value;
    },
    exception(val) {
      this.alert = !!val;
    },
    alert(val) {
      this.$emit("input", val);
    },
  },
};
</script>
