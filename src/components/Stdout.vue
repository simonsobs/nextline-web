<template>
  <v-card flat height="100%" color="background lighten-4">
    <v-system-bar color="primary" dark>
      <v-icon>mdi-window-maximize</v-icon>
      <span>stdout</span>
      <v-spacer></v-spacer>
      <v-tooltip bottom open-delay="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            x-small
            :disabled="!data?.stdout"
            @click="clear"
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
        class="overflow-auto">{{ data?.stdout }}<span ref="bottom"></span></pre>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

import { useStdoutSubscription } from "@/gql/graphql";

const handleSubscription = (
  messages = { stdout: "" },
  response: { stdout: string }
) => {
  nextTick(() => {
    nextTick(() => {
      if (bottom.value) bottom.value.scrollIntoView(false);
    });
  });
  return { stdout: messages.stdout + response.stdout };
};
const subscription = useStdoutSubscription({}, handleSubscription);
function clear() {
  if (subscription.data?.value) subscription.data.value.stdout = "";
}
const bottom = ref(null as HTMLElement | null);
const data = ref(subscription.data);
</script>
