<template>
  <div>
    <v-card>
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
  </div>
</template>

<script setup lang="ts">
import { useAutoModeTurnOffMutation } from "@/graphql/codegen/generated";
const { executeMutation: turnOff } = useAutoModeTurnOffMutation();
</script>

<style scoped>
:deep(.v-card) {
  width: 290px;
  padding: 4px;
}
</style>
