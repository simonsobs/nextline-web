<template>
  <div>
    <v-card>
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
import { useAutoModeTurnOnMutation } from "@/graphql/codegen/generated";

const { executeMutation: turnOn } = useAutoModeTurnOnMutation();
</script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
