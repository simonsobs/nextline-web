<template>
  <v-card class="pa-2">
    <v-card-title> Run (non-interactive)? </v-card-title>
    <v-card-text>
      You are about to run the script on the server
      <span class="font-weight-medium font-italic"> {{ apiName }} </span> in the
      non-interactive mode.
    </v-card-text>
    <v-card-text>
      If you need to run interactively line by line, please press
      <span class="font-italic">cancel</span> and then press the
      <span class="font-italic">run interactively</span> button.
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="grey-darken-2" @click="$emit('cancel')">
        cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="flat" color="primary" @click="$emit('confirm')">
        start
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
