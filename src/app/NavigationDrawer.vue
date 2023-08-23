<template>
  <v-navigation-drawer disable-resize-watcher comment="fallthrough attributes">
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
      <list-navi></list-navi>
    </v-card>
    <template v-slot:append>
      <v-list>
        <v-list-item :title="`v${version}`" disabled> </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useConfig } from "@/utils/config";
import ListNavi from "./ListNavi.vue";
const { config } = useConfig();
const version = ref(import.meta.env.PACKAGE_VERSION);
const appName = computed(() => config.value.appName || "loading...");
</script>
