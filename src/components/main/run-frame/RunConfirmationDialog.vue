<template>
  <v-card>
    <v-card-title> Start running the script? </v-card-title>
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
interface Emits {
  (event: "confirm"): void;
  (event: "cancel"): void;
}
defineEmits<Emits>();
</script>
