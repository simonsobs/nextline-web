<template>
  <v-card outlined flat>
    <v-card flat class="mt-1 overflow-y-auto" max-height="400">
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row class="flex-nowrap">
            <div class="mr-3" style="min-width: 1em">
              <pre><code><span
                            v-for="i in sourceLines.length"
                            :key="i"
                            ><span>{{ i }}</span>{{ '\n' }}</span></code></pre>
            </div>
            <div class="mr-3" style="min-width: 2em"></div>
            <div>
              <vue-code-highlight language="python">{{
                source
              }}</vue-code-highlight>
            </div>
            <!-- </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <!-- <v-textarea :value="source"></v-textarea> -->
    </v-card>
  </v-card>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "prism-es6/components/prism-markup-templating";
import "prism-es6/components/prism-python";
import "@/prism.css";

import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "ScriptViewer",
  components: {
    VueCodeHighlight,
  },
  data: () => ({
    sourceLines: [],
  }),
  apollo: {
    sourceLines: {
      query: QUERY_SOURCE,
      update(data) {
        return data.source;
      },
    },
  },
  computed: {
    source() {
      return this.sourceLines.join("\n");
    },
  },
};
</script>
