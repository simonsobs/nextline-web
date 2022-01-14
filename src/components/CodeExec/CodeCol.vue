<template>
  <v-card-text class="pa-0 fill-height">
    <v-container
      fluid
      fill-height
      ma-0
      pa-0
      ref="card-source"
      class="align-start overflow-y-auto"
    >
      <v-row class="ma-0 py-1 flex-nowrap" style="min-width: 0">
        <div class="pl-1 mr-3 flex-grow-0 flex-shrink-0" style="min-width: 1em">
          <pre><code><span
                            v-for="i in sourceLines.length"
                            :key="i"
                            ><span :ref="`card-source-line-${i}`">{{ i }}</span>{{ '\n' }}</span></code></pre>
        </div>
        <div class="mr-3 flex-grow-0 flex-shrink-0" style="min-width: 2em">
          <pre><code>{{ "\n".repeat(threadTaskState.lineNo - 1) }}<v-icon :color='threadTaskState.prompting ? "primary" : "secondary"'>mdi-arrow-right-bold</v-icon></code></pre>
        </div>
        <div
          class="pr-1 flex-grow-1 flex-shrink-1"
          style="overflow-x: auto; flex-basis: 0; min-width: 2em"
        >
          <vue-code-highlight class="code-highlight" language="python">{{
            source
          }}</vue-code-highlight>
        </div>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";
import "@/prism.css";

import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "CodeCol",
  components: {
    VueCodeHighlight,
  },
  props: {
    threadTaskState: Object,
  },
  data() {
    return {
      sourceLines: [],
    };
  },
  computed: {
    source() {
      return this.sourceLines.join("\n");
    },
  },
  apollo: {
    sourceLines: {
      query: QUERY_SOURCE,
      variables() {
        return {
          fileName: this.threadTaskState.fileName,
        };
      },
      skip() {
        return !this.threadTaskState;
      },
      update(data) {
        return data.source;
      },
      result() {
        this.$nextTick(this.scroll);
      },
    },
  },
  watch: {
    threadTaskState: {
      handler() {
        this.$nextTick(this.scroll);
      },
      immediate: true,
    },
  },
  methods: {
    scroll() {
      // How to programmatically scroll an element instead of a page in vuetify
      // https://stackoverflow.com/a/64371340/7309855
      // https://jsfiddle.net/yjpq03da/

      if (!this.threadTaskState) {
        return;
      }

      if (!this.threadTaskState.prompting) {
        return;
      }

      const container_ref_name = "card-source";
      const target_ref_name = `card-source-line-${this.threadTaskState.lineNo}`;

      const container = this.$refs[container_ref_name];
      if (!container) {
        return;
      }

      const targets = this.$refs[target_ref_name];
      if (!targets) {
        return;
      }

      const target = targets[0];
      // Note: ref is an array when defined in v-for loop

      // target must be a Number/Selector/HTMLElement/VueComponent
      if (!target) {
        return;
      }

      this.$vuetify.goTo(target, { container });
    },
  },
};
</script>

<style scoped>
.code-highlight {
  cursor: default;
}

.code-highlight:before {
  background: inherit; /* prevent highlight when focused */
}
</style>
