import type { Client } from "@urql/vue";
import { provideClient } from "@urql/vue";
import type { MaybeRef, Ref } from "vue";
import { computed, ref, unref, watchEffect } from "vue";

import { useConfig } from "@/utils/config";

import { createClient } from "./create";

export function useProvideClient() {
  const url = useUrl();
  const client = useClient(url);
  provideClient(client);
}

function useUrl() {
  const { config } = useConfig();
  const url = computed(() => config.value.apiHttp);
  return url;
}

function useClient(url: MaybeRef<string>) {
  const client = ref() as Ref<Client>;
  watchEffect(() => {
    client.value = createClient(unref(url));
  });
  return client;
}
