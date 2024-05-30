<template>
  <VCard class="pa-2">
    <VCardTitle> Run (non-interactive)? </VCardTitle>
    <VCardText>
      You are about to run the script on the server
      <span class="font-weight-medium font-italic"> {{ apiName }} </span> in the
      non-interactive mode.
    </VCardText>
    <VCardText>
      If you need to run interactively line by line, please press
      <span class="font-italic">cancel</span> and then press the
      <span class="font-italic">run interactively</span> button.
    </VCardText>
    <VCardActions>
      <VBtn variant="text" color="grey-darken-2" @click="$emit('cancel')">
        cancel
      </VBtn>
      <VSpacer></VSpacer>
      <VBtn variant="flat" color="primary" @click="$emit('confirm')"> start </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfig } from "@/utils/config";
interface Emits {
  (event: "confirm"): void;
  (event: "cancel"): void;
}
defineEmits<Emits>();
const { config } = useConfig();
const apiName = computed(() => config.value.apiName || "");
</script>
