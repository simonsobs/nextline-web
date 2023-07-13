<template>
  <v-card-actions>
    <span class="text-capitalize mx-3">
      {{ scheduleAutoModeState }}
    </span>
    <v-btn variant="outlined" @click="turnOn" v-if="scheduleAutoModeState == 'off'">
      turn on
    </v-btn>
    <v-btn variant="outlined" @click="turnOff" v-else> turn off </v-btn>
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
