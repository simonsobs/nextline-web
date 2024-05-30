<template>
  <VCard class="pa-2">
    <VCardTitle> Run interactively? </VCardTitle>
    <VCardText>
      You are about to run the script on the server
      <span class="font-weight-medium font-italic"> {{ apiName }} </span> in the
      interactive mode.
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
