<template>
  <v-card v-if="scheduleStore.autoMode == null" class="pa-1" max-width="290px">
    <v-alert
      type="error"
      variant="tonal"
      title="Error"
      text="Unable to determine auto mode state."
    >
    </v-alert>
  </v-card>
  <v-card v-else-if="scheduleStore.autoMode" class="pa-1" max-width="290px">
    <v-card-text>
      <div class="text=h6 mb-1">
        <p>
          In auto mode, after each run, the next script is automatically loaded
          from the scheduler and run.
        </p>
        <p style="margin-top: 1.5em">Turn off auto mode?</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="turnOff"> turn off </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else class="pa-1" max-width="290px">
    <v-card-text>
      <div class="text=h6 mb-1">
        <p>
          In auto mode, after each run, the next script is automatically loaded
          from the scheduler and run.
        </p>
        <p style="margin-top: 1.5em">Turn on auto mode?</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="turnOn"> turn on </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useScheduleStore } from "@/stores/schedule";
import {
  useAutoModeTurnOffMutation,
  useAutoModeTurnOnMutation,
} from "@/graphql/codegen/generated";

const scheduleStore = useScheduleStore();
const { executeMutation: turnOn } = useAutoModeTurnOnMutation();
const { executeMutation: turnOff } = useAutoModeTurnOffMutation();
</script>
