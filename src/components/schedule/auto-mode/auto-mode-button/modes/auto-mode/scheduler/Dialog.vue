<template>
  <VCard>
    <VCardText>
      <div class="mb-1">
        <p class="font-weight-medium">
          The auto mode currently is <span class="font-italic"> on </span> and loads
          scripts from the <span class="font-italic"> scheduler </span>.
        </p>
        <p class="mt-3">
          The auto mode automatically loads and runs the next script after each run
          successfully ends.
        </p>
        <p class="mt-3">
          The auto mode can load scripts from either the
          <span class="font-italic"> scheduler </span> or the
          <span class="font-italic"> queue </span>.
        </p>
      </div>
    </VCardText>
    <VCardActions>
      <VBtn variant="outlined" class="flex-grow-1" @click="switchToLoadFromQueue">
        switch to load from queue
      </VBtn>
    </VCardActions>
    <VCardActions>
      <VBtn variant="outlined" class="flex-grow-1" @click="turnOff">
        turn off auto mode
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { useScheduleAutoModeChangeModeMutation } from "@/graphql/codegen/generated";
const { executeMutation: changeMode } = useScheduleAutoModeChangeModeMutation();

async function switchToLoadFromQueue() {
  await changeMode({ mode: "queue" });
}

async function turnOff() {
  await changeMode({ mode: "off" });
}
</script>
