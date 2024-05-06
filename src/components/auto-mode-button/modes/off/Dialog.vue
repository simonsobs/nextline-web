<template>
  <div>
    <v-card>
      <v-card-text>
        <div class="mb-1">
          <p class="font-weight-medium">
            The auto mode is currently <span class="font-italic"> off </span>.
          </p>
          <p class="mt-3">
            If on, it automatically loads and runs the next script after each run
            successfully ends.
          </p>
          <p class="mt-3">
            The auto mode can load scripts from either the
            <span class="font-italic"> scheduler </span> or the
            <span class="font-italic"> queue </span>.
          </p>
          <p class="mt-3">Turn on auto mode?</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="turnOnFromScheduler">
          turn on from scheduler
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="turnOnFromQueue"> turn on from queue </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useScheduleAutoModeChangeModeMutation } from "@/graphql/codegen/generated";

const { executeMutation: changeMode } = useScheduleAutoModeChangeModeMutation();

async function turnOnFromScheduler() {
  await changeMode({ mode: "scheduler" });
}

async function turnOnFromQueue() {
  await changeMode({ mode: "queue" });
}
</script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
