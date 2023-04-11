<template>
  <v-card-actions>
    <v-chip color="primary text-capitalize mx-2">
      {{ scheduleAutoModeState }}
    </v-chip>
    <v-btn outlined text @click="turnOn" v-if="scheduleAutoModeState == 'off'">
      turn on
    </v-btn>
    <v-btn outlined text @click="turnOff" v-else> turn off </v-btn>
  </v-card-actions>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  useAutoModeTurnOffMutation,
  useAutoModeTurnOnMutation,
  useScheduleAutoModeStateSubscription,
} from "@/gql/graphql";
const scheduleAutoModeStateSubscription =
  useScheduleAutoModeStateSubscription();
const scheduleAutoModeState = computed(
  () => scheduleAutoModeStateSubscription.data?.value?.scheduleAutoModeState
);
const { executeMutation: turnOn } = useAutoModeTurnOnMutation();
const { executeMutation: turnOff } = useAutoModeTurnOffMutation();
</script>
