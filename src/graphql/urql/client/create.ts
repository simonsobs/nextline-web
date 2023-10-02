import {
  createClient as createUrqlClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
import type { SubscriptionForwarder } from "@urql/vue";
import { createClient as createWSClient } from "graphql-ws";

export function createClient(url: string) {
  // WebSocket endpoint. "ws://" for "http://" and "wss://" for "https://"
  const wsEndpoint = url.replace(/^http/i, "ws");

  const wsClient = createWSClient({ url: wsEndpoint });

  const forwardSubscription: SubscriptionForwarder = (request) => {
    const input = { ...request, query: request.query || "" };
    return {
      subscribe(sink) {
        const unsubscribe = wsClient.subscribe(input, sink);
        return { unsubscribe };
      },
    };
  };

  const _subscriptionExchange = subscriptionExchange({ forwardSubscription });

  const client = createUrqlClient({
    url: url,
    requestPolicy: "network-only",
    exchanges: [cacheExchange, fetchExchange, _subscriptionExchange],
  });

  return client;
}
