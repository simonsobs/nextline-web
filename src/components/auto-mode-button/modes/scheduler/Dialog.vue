<template>
  <div>
    <v-card>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="switchToLoadFromQueue">
          switch to load from queue
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="turnOff"> turn off auto mode </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAutoModeTurnOffMutation } from "@/graphql/codegen/generated";
const { executeMutation: turnOff } = useAutoModeTurnOffMutation();

function switchToLoadFromQueue() {
  console.log("switch to load from queue");
}
</script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
