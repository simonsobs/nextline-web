<template>
  <v-alert v-model="alert" dismissible type="error" class="my-2">
    <pre
      v-text="exception"
      style="white-space: pre-wrap; overflow-wrap: anywhere"
    ></pre>
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useExceptionQuery, useStateSubscription } from "@/gql/graphql";

export default defineComponent({
  name: "Exception",
  props: {
    value: Boolean,
  },
  setup(props, { emit }) {
    const subscription = useStateSubscription();

    const pause = ref(true);

    const query = useExceptionQuery({ pause: pause.value });

    watch(subscription.data, (val) => {
      pause.value = val?.state !== "finished";
      if (!pause.value) {
        query.executeQuery();
      }
    });

    const exception = ref(null as string | null | undefined);

    const alert = ref(false);

    watch(props, (val) => {
      alert.value = val.value;
    });

    watch(query.data, (val) => {
      alert.value = !!val?.exception;
      exception.value = val?.exception;
    });

    watch(alert, (val) => {
      if (!val) exception.value = null;
      emit("input", val);
    });

    return {
      exception,
      alert,
      pause,
    };
  },
});
</script>
