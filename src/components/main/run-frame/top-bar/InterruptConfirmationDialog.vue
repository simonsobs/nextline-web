<template>
  <VCard class="pa-2">
    <VCardTitle class="text-error"> Interrupt the run?</VCardTitle>
    <VCardText>
      Press <span class="font-weight-medium font-italic">Yes</span> to send the signal
      <span class="font-weight-medium font-italic"> SIGINT </span>
      to the process running the script on the server. This is equivalent to pressing
      <span class="font-weight-medium font-italic">Ctrl+C</span> in the terminal. It
      rases the <span class="font-weight-medium font-italic">KeyboardInterrupt</span>.
    </VCardText>
    <VCardText>
      Press <span class="font-weight-medium font-italic">No</span> to close this dialog
      without sending the signal.
    </VCardText>
    <VCardActions>
      <VBtn variant="text" color="grey-darken-2" @click="$emit('cancel')"> no </VBtn>
      <VSpacer></VSpacer>
      <VBtn variant="outlined" color="error" @click="$emit('confirm')"> yes </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
interface Emits {
  (event: "confirm"): void;
  (event: "cancel"): void;
}
defineEmits<Emits>();
</script>
