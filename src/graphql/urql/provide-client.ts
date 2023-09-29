import { ref, unref, toRefs, watchEffect } from "vue";
import type { Ref, MaybeRef } from "vue";
import { provideClient } from "@urql/vue";
import type { Client } from "@urql/vue";

import { useConfig } from "@/utils/config";

import { createClient } from "./create-client";

export function useProvideClient() {
  const url = useUrl();
  const client = useClient(url);
  provideClient(client);
}

function useUrl() {
  const { config } = useConfig();
  const { apiHttp: url } = toRefs(config.value);
  return url;
}

function useClient(url: MaybeRef<string>) {
  const client = ref() as Ref<Client>;
  watchEffect(() => {
    client.value = createClient(unref(url));
  });
  return client;
}
