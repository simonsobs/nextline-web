<template>
  <v-system-bar dark :color="state.prompting ? 'primary' : 'grey'">
    <v-icon> mdi-language-python </v-icon>
    <v-tooltip bottom open-delay="500">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ basename }}</span>
      </template>
      <span>{{ state.fileName }}</span>
    </v-tooltip>
  </v-system-bar>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import path from "path";

interface PromptingData {
  prompting: number;
  fileName: string;
  lineNo: number;
  traceEvent: string;
}

export default defineComponent({
  name: "SystemBar",
  props: {
    state: { type: Object as PropType<PromptingData>, required: true },
  },
  setup(props) {
    const basename = computed(() => {
      return path.basename(props.state.fileName);
    });
    return {
      basename,
    };
  },
});
</script>
