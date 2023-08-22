import {
  createClient,
  provideClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";

import { useConfig } from "@/utils/config";

export function useProvideClient() {
  const { config } = useConfig();
  const url = config.value.apiHttp;

  // WebSocket endpoint. "ws://" for "http://" and "wss://" for "https://"
  const wsEndpoint = url.replace(/^http/i, "ws");

  // for graphql-ws
  const wsClient = createWSClient({
    url: wsEndpoint,
  });

  const client = createClient({
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

  provideClient(client);
}
