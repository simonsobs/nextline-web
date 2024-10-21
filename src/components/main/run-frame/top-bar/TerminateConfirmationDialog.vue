<template>
  <VCard class="pa-2">
    <VCardTitle class="text-error"> Terminate the run?</VCardTitle>
    <VCardText>
      Press <span class="font-weight-medium font-italic">Yes</span> to send the signal
      <span class="font-weight-medium font-italic"> SIGTERM </span>
      to the process running the script on the server. This is equivalent to executing
      <span class="font-weight-medium font-italic">kill &lt;pid&gt;</span> in the
      terminal. No exception will be raised. No <span class="font-italic">finally</span>
      block will be executed. A signal handler (if registered) will be executed.
    </VCardText>
    <VCardText>
      Use this option after trying to <span class="font-italic"> interrupt </span> the
      run.
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
