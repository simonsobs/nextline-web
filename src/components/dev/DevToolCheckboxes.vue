<template>
  <div v-if="enabled">
    <VMenu right bottom offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <VBtn
          v-bind="props"
          variant="plain"
          density="compact"
          size="x-small"
          :style="buttonStyle"
          icon="mdi-nut"
        >
        </VBtn>
      </template>
      <VList dense class="pr-1">
        <VListSubheader>Dev Tool</VListSubheader>
        <VListItem v-for="(item, key) in data">
          <VCheckbox
            v-model="data[key]"
            :label="key as string"
            density="comfortable"
            :hide-details="true"
          >
          </VCheckbox>
        </VListItem>
        <VListItem>
          <VBtn
            color="primary"
            variant="tonal"
            @click="clear"
            :disabled="disableClear"
          >
            Clear
          </VBtn>
        </VListItem>
      </VList>
    </VMenu>
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
