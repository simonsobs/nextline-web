<template>
  <v-spacer></v-spacer>
  <v-btn variant="outlined" prepend-icon="mdi-close" @click="executeInterrupt">
    interrupt
  </v-btn>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        v-bind="props"
        icon="mdi-dots-horizontal"
        density="compact"
      >
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="executeTerminate({})">
        <template v-slot:prepend>
          <v-icon> mdi-close-octagon-outline </v-icon>
        </template>
        terminate
      </v-list-item>
      <v-list-item @click="executeKill({})">
        <template v-slot:prepend>
          <v-icon> mdi-close-octagon </v-icon>
        </template>
        kill
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import {
  useInterruptMutation,
  useTerminateMutation,
  useKillMutation,
} from "@/graphql/codegen/generated";

const { executeMutation: executeInterrupt } = useInterruptMutation();
const { executeMutation: executeTerminate } = useTerminateMutation();
const { executeMutation: executeKill } = useKillMutation();
</script>
