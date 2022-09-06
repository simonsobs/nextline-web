import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
import gql from "vite-plugin-simple-gql";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue(),
    gql(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
