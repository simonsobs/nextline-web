<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    disable-resize-watcher
    color="surface-container"
  >
    <v-card flat style="background-color: inherit">
      <template v-slot:prepend>
        <v-list>
          <v-list-item density="compact">
            <template v-slot:title>
              <span class="text-primary font-weight-bold"> {{ appName }} </span>
            </template>
          </v-list-item>
        </v-list>
      </template>
      <v-list>
        <v-list-item
          link
          router
          v-for="(item, i) in naviItems"
          :key="i"
          :to="item.to"
          :exact="item.exact"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="drawer = false"
        >
        </v-list-item>
      </v-list>
    </v-card>
    <template v-slot:append>
      <v-list>
        <v-list-item :title="`v${version}`" disabled> </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { useConfigStore } from "@/stores/config";

import naviItems from "./navi-items";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (event: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const configStore = useConfigStore();

const drawer = ref(false);

watch(props, (val) => {
  drawer.value = val.modelValue;
});

watch(drawer, (val) => {
  emit("update:modelValue", val);
});

const version = ref(import.meta.env.PACKAGE_VERSION);

const appName = computed(() => configStore.config?.appName || "loading...");
</script>
