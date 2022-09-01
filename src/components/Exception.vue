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
import { useQuery, useSubscription } from "@urql/vue";

import QUERY_EXCEPTION from "@/graphql/queries/Exception.gql";
import SUBSCRIBE_STATE from "@/graphql/subscriptions/State.gql";

export default defineComponent({
  name: "Exception",
  props: {
    value: Boolean,
  },
  setup(props, { emit }) {
    const subscription = useSubscription<{ state: string }>({
      query: SUBSCRIBE_STATE,
    });

    const pause = ref(true);

    const query = useQuery<{ exception: string }>({
      query: QUERY_EXCEPTION,
      pause,
    });

    watch(subscription.data, (val) => {
      pause.value = val?.state !== "finished";
      query.executeQuery();
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
    };
  },
});
</script>
