<template>
  <VCardActions class="flex-row flex-wrap justify-end">
    <VBtn
      variant="outlined"
      prepend-icon="mdi-reload"
      :disabled="!editing"
      @click="emit('reset')"
    >
      discard changes
    </VBtn>
    <VBtn
      variant="flat"
      prepend-icon="mdi-content-save"
      :disabled="!editing"
      @click="emit('save')"
    >
      save
    </VBtn>
    <Component :is="menuComponent" v-bind="menuAttributes">
      <template #activator="{ props }">
        <VBtn v-bind="props" icon="mdi-dots-horizontal"> </VBtn>
      </template>
      <VList>
        <VListItem @click="emit('load')">
          <template #prepend>
            <VIcon> mdi-timer </VIcon>
          </template>
          Load From Scheduler
        </VListItem>
        <VListItem v-if="devMode" @click="emit('loadExample')">
          <template #prepend>
            <VIcon> mdi-code-tags </VIcon>
          </template>
          Load Example Script
        </VListItem>
      </VList>
    </Component>
  </VCardActions>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { VBottomSheet } from "vuetify/components/VBottomSheet";
import { VMenu } from "vuetify/components/VMenu";

import { useDevTool } from "@/utils/dev/enabled";
interface Props {
  editing: boolean;
}

const { isDevToolEnabled: devMode } = useDevTool();

type Emits = {
  reset: [];
  save: [];
  load: [];
  loadExample: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const { mobile } = useDisplay();

const menuComponent = computed(() => (mobile.value ? VBottomSheet : VMenu));
const menuAttributes = computed(() => (mobile.value ? {} : { location: "top" }));
</script>
