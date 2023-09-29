import {
  createClient as createUrqlClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";

export function createClient(url: string) {
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
