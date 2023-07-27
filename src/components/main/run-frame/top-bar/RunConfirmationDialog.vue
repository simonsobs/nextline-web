<template>
  <v-card class="pa-2">
    <v-card-title> Run the script? </v-card-title>
    <v-card-text class="font-weight-medium"> {{ apiName }}</v-card-text>
    <v-card-text>
      Press <span class="font-italic">yes</span> to confirm.
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="grey-darken-2" @click="$emit('cancel')">
        cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="flat" color="primary" @click="$emit('confirm')">
        yes
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
