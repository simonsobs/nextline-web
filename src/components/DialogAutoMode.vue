<template>
  <div>
    <v-card v-if="autoMode == undefined">
      <v-alert
        type="error"
        variant="tonal"
        title="Error"
        text="Unable to determine auto mode state."
      >
      </v-alert>
    </v-card>
    <v-card v-else-if="autoMode">
      <v-card-text>
        <div class="text=h6 mb-1">
          <p>
            In auto mode, after each run, the next script is automatically loaded from
            the scheduler and run.
          </p>
          <p style="margin-top: 1.5em">Turn off auto mode?</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="turnOff"> turn off </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <div class="text=h6 mb-1">
          <p>
            In auto mode, after each run, the next script is automatically loaded from
            the scheduler and run.
          </p>
          <p style="margin-top: 1.5em">Turn on auto mode?</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="turnOn"> turn on </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {
  useAutoModeTurnOffMutation,
  useAutoModeTurnOnMutation,
} from "@/graphql/codegen/generated";

const { executeMutation: turnOn } = useAutoModeTurnOnMutation();
const { executeMutation: turnOff } = useAutoModeTurnOffMutation();

import { useSubscribeScheduleAutoMode } from "@/api";
const subscription = useSubscribeScheduleAutoMode();
const { autoMode } = subscription;

await subscription;
</script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
