<template>
  <p class="ma-4 font-weight-light">
    Python scripts in the queue are executed in the order when the auto mode is
    <span class="font-italic"> Queue. </span>
    <span v-if="!mobile">
      The items in the queue are not stored in the database but in the memory of the
      backend server. If the server is restarted, the queue will be empty.
    </span>
  </p>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
</script>
