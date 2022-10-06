<template>
  <div>
    <div v-if="state">{{ state }}</div>
    <div v-if="sub">{{ sub }}</div>
    <pre v-if="subscription">{{ subscription }}</pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { gql, useQuery, useSubscription } from "@urql/vue";

// import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";

const query = useQuery({
  query: gql`
    query {
      state
    }
  `,
});

const subscription = useSubscription({
  //   query: SUBSCRIBE_STATE,
  query: gql`
    subscription {
      state
    }
  `,
});

const state = computed(() => query.data);
const sub = computed(() => subscription.data);
</script>

<style></style>
