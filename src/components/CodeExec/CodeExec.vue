<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keydown.stop.prevent="keyboardEvent = $event"
    class="code-exec grey lighten-5"
  >
    <template v-if="prompting">
      <system-bar :state="prompting">></system-bar>
      <v-container fluid style="height: 100%">
        <!-- <v-container fluid fill-height> too tall somehow -->
        <v-row class="fill-height flex-column flex-nowrap justify-start">
          <v-col class="flex-grow-0 pa-0">
            <cmd-col
              :traceId="traceId"
              :disabled="!prompting.prompting"
              :keyboard-event="keyboardEvent"
            ></cmd-col>
          </v-col>
          <v-divider></v-divider>
          <v-col class="overflow-hidden pa-0">
            <code-col :state="prompting"></code-col>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>
</template>

<script>
import SUBSCRIBE_PROMPTING from "@/graphql/subscriptions/Prompting.gql";

import SystemBar from "./SystemBar.vue";
import CmdCol from "./CmdCol.vue";
import CodeCol from "./CodeCol.vue";

export default {
  name: "CodeExec",
  components: {
    SystemBar,
    CmdCol,
    CodeCol,
  },
  props: { traceId: Number },
  data() {
    return {
      prompting: null,
      keyboardEvent: null,
    };
  },
  apollo: {
    $subscribe: {
      prompting: {
        query: SUBSCRIBE_PROMPTING,
        variables() {
          return { traceId: this.traceId };
        },
        result({ data }) {
          this.prompting = data.prompting;
        },
      },
    },
  },
  watch: {
    keyboardEvent(val) {
      // console.log(val);
    },
    prompting() {
      // console.log(document.activeElement);
    },
  },
};
</script>

<style scoped>
.code-exec {
  cursor: default;
}

.code-exec:before {
  background: inherit; /* prevent highlight when focused */
}
</style>
