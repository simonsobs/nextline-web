<template>
  <VCard>
    <VCardText>
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
    </VCardText>
    <VCardActions>
      <VBtn variant="outlined" class="flex-grow-1" @click="turnOnFromScheduler">
        turn on from scheduler
      </VBtn>
    </VCardActions>
    <VCardActions>
      <VBtn variant="outlined" class="flex-grow-1" @click="turnOnFromQueue">
        turn on from queue
      </VBtn>
    </VCardActions>
  </VCard>
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
