<template>
  <v-card flat class="grey lighten-5 d-flex">
    <schedule-ctrl></schedule-ctrl>
    <run-ctrl></run-ctrl>
  </v-card>
</template>

<script setup lang="ts">
import ScheduleCtrl from "@/components/ScheduleCtrl.vue";
import RunCtrl from "@/components/RunCtrl.vue";
</script>
