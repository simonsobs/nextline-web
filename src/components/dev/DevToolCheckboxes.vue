<template>
  <div v-if="enabled">
    <v-menu right bottom offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="plain"
          density="compact"
          size="x-small"
          :style="buttonStyle"
          icon="mdi-nut"
        >
        </v-btn>
      </template>
      <v-list dense class="pr-1">
        <v-list-subheader>Dev Tool</v-list-subheader>
        <v-list-item v-for="(item, key) in data">
          <v-checkbox
            v-model="data[key]"
            :label="key as string"
            density="comfortable"
            :hide-details="true"
          >
          </v-checkbox>
        </v-list-item>
        <v-list-item>
          <v-btn
            color="primary"
            variant="tonal"
            @click="clear"
            :disabled="disableClear"
          >
            Clear
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed, watch } from "vue";
import { useVModel } from "@vueuse/core";
import { useDevTool } from "@/utils/dev/enabled";

export interface Model {
  [key: string]: boolean;
}

interface Props {
  modelValue: Model;
  top?: string;
  right?: string;
}

const props = withDefaults(defineProps<Props>(), {
  top: "-15px",
  right: "-10px",
});

type Emits = {
  "update:modelValue": [value: Model];
};

const emit = defineEmits<Emits>();

const data = useVModel(props, "modelValue", emit);

function clear() {
  for (const key in data.value) {
    data.value[key] = false;
  }
}

const disableClear = computed(() => Object.values(data.value).every((v) => !v));

const buttonStyle = computed(() => ({
  position: "absolute",
  top: props.top,
  right: props.right,
}));

const { isDevToolEnabled: enabled } = useDevTool();
watch(enabled, (val) => {
  if (!val) clear();
});
</script>

<style scoped>
:deep(.v-list-item-title) {
  text-transform: capitalize;
}
:deep(.v-label) {
  text-transform: capitalize;
}
</style>
