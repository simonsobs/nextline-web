import { createApp } from "vue";

/**
 * Helper function to test composables with lifecycle hooks and provide/inject
 * https://vuejs.org/guide/scaling-up/testing.html#testing-composables
 */
export function withSetup(setup: () => void) {
  const app = createApp({
    setup() {
      setup();
      return () => {};
    },
  });
  app.mount(document.createElement("div"));
  return app;
}
