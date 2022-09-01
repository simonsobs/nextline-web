<template>
  <div>
    <div v-if="state">{{ state }}</div>
    <div v-if="sub">{{ sub }}</div>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { gql, useQuery, useSubscription } from "@urql/vue";

// import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";

export default defineComponent({
  name: "ScratchUrql",
  setup() {
    const state = useQuery({
      query: gql`
        query {
          state
        }
      `,
    });

    const result = useSubscription({
      //   query: SUBSCRIBE_STATE,
      query: gql`
        subscription {
          state
        }
      `,
    });

    // watch(
    //   result,
    //   (val) => {
    // 	console.log(val);
    //   },
    //   { immediate: true }
    // );

    return {
      state: state.data,
      sub: result.data,
      result,
    };
  },
});
</script>

<style></style>
