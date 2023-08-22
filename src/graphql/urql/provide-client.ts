import { ref, toRefs, toValue, watch } from "vue";
import type { MaybeRefOrGetter } from "vue";
import {
  createClient as createUrqlClient,
  provideClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";

import { useConfig } from "@/utils/config";

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

function useClient(url: MaybeRefOrGetter<string>) {
  const client = ref(createClient(toValue(url)));
  watch(
    () => toValue(url),
    (val) => {
      client.value = createClient(val);
    }
  );
  return client;
}

function createClient(url: string) {
  // WebSocket endpoint. "ws://" for "http://" and "wss://" for "https://"
  const wsEndpoint = url.replace(/^http/i, "ws");

  const wsClient = createWSClient({
    url: wsEndpoint,
  });

  const client = createUrqlClient({
    url: url,
    requestPolicy: "network-only",
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          const input = { ...request, query: request.query || "" };
          return {
            subscribe(sink) {
              const unsubscribe = wsClient.subscribe(input, sink);
              return { unsubscribe };
            },
          };
        },
      }),
    ],
  });

  return client;
}
