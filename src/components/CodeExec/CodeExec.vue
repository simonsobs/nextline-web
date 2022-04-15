<template>
  <v-card
    flat
    height="100%"
    :ripple="false"
    tabindex="0"
    @keydown.stop.prevent="keyboardEvent = $event"
    class="code-exec grey lighten-5"
    style="min-height: 0"
  >
    <template v-if="prompting">
      <system-bar :state="prompting"></system-bar>
      <div class="g-container">
        <cmd-col
          :traceId="traceId"
          :disabled="!prompting.prompting"
          :keyboard-event="keyboardEvent"
        ></cmd-col>
        <v-divider></v-divider>
        <div style="height: 100%">
          <code-col :state="prompting"></code-col>
        </div>
      </div>
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
.g-container {
  display: grid;
  height: calc(100% - 24px); /* 24px: system bar */
  grid-template-columns: minmax(100px, 1fr);
  grid-template-rows: min-content min-content minmax(0, 1fr);
}
</style>
