import {
  createClient,
  provideClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from "@urql/vue";
// import { createClient as createWSClient } from "graphql-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

// https://formidable.com/open-source/urql/docs/advanced/subscriptions/
// https://github.com/enisdenjo/graphql-ws/blob/master/README.md
// https://github.com/apollographql/subscriptions-transport-ws/blob/master/README.md
// TODO: switch to graphql-ws as subscriptions-transport-ws is no longer maintained.
// However, graphql-ws doesn't seem to work with urql at the moment:
// https://qiita.com/mu-suke08/items/6dc353dd641e352f350e

export function useProvideClient(url: string) {
  // WebSocket endpoint. "ws://" for "http://" and "wss://" for "https://"
  const wsEndpoint = url.replace(/^http/i, "ws");

  //   // for graphql-ws
  //   const wsClient = createWSClient({
  //     url: wsEndpoint,
  //   });

  const subscriptionClient = new SubscriptionClient(wsEndpoint, {
    reconnect: true,
  });

  const client = createClient({
    url: url,
    requestPolicy: "network-only",
    exchanges: [
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) =>
          subscriptionClient.request(operation),
        // // for graphql-ws
        // forwardSubscription: (operation) => ({
        //   subscribe: (sink) => ({
        //     unsubscribe: wsClient.subscribe(operation, sink),
        //   }),
        // }),
      }),
    ],
  });
  
  provideClient(client);
}
