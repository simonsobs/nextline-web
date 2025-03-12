<template>
  <VAlert v-model="alert" closable type="error" variant="tonal" class="my-2">
    <pre
      style="white-space: pre-wrap; overflow-wrap: anywhere"
      v-text="exception"
    ></pre>
  </VAlert>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

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

const stateSubscription = useSubscribeState();
const { state } = stateSubscription;

const pause = ref(true);

const query = useCtrlExceptionQuery({ pause: pause.value });

watch(state, (val) => {
  pause.value = val !== "finished";
  if (!pause.value) {
    query.executeQuery();
  }
});

const exception = ref(null as string | null | undefined);

const alert = ref(false);

watch(props, (val) => {
  alert.value = val.modelValue;
});

watch(query.data, (val) => {
  alert.value = !!val?.ctrl.exception;
  exception.value = val?.ctrl.exception;
});

watch(alert, (val) => {
  if (!val) exception.value = null;
  emit("update:modelValue", val);
});

await stateSubscription;
</script>
