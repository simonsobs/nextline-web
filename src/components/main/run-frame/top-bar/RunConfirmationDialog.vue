<template>
  <v-card>
    <v-card-title> Start running the script? </v-card-title>
	<v-card-text> {{ apiName }}</v-card-text>
    <v-card-text> Are you sure to start? </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="grey-darken-2" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="text" color="primary" @click="$emit('confirm')">
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfigStore } from "@/stores/config";
interface Emits {
  (event: "confirm"): void;
  (event: "cancel"): void;
}
defineEmits<Emits>();
const configStore = useConfigStore();
const apiName = computed(() => configStore.config?.apiName || "");
</script>
