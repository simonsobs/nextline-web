<template>
  <div><v-textarea :value="source"></v-textarea></div>
</template>

<script>
import QUERY_SOURCE from "@/graphql/queries/Source.gql";

export default {
  name: "ScriptEditor",
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
