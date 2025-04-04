<template>
  <VAlert v-model="alert" closable type="error" variant="tonal" class="my-2">
    <pre
      style="white-space: pre-wrap; overflow-wrap: anywhere"
      v-text="exception"
    ></pre>
  </VAlert>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useVModel } from "@vueuse/core";

import { useSubscribeState } from "@/api";
import { useCtrlExceptionQuery } from "@/graphql/codegen/generated";

interface Props {
  modelValue: boolean;
}

type Emits = {
  "update:modelValue": [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const alert = useVModel(props, "modelValue", emit);

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const query = useCtrlExceptionQuery({ pause: true, variables: {} });

watchEffect(() => {
  if (state.value !== "finished") {
    alert.value = false;
    return;
  }
  query.executeQuery();
});

const exception = computed(() =>
  state.value !== "finished" ? null : query.data.value?.ctrl.exception
);

watchEffect(() => {
  alert.value = !!exception.value;
});

await stateSubscription;
</script>
