import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import loadVersion from 'vite-plugin-package-version';
import gql from "vite-plugin-simple-gql";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import path from "path-browserify";

export default defineConfig({
  plugins: [
    vue(),
    loadVersion(),
    gql(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      path: "path-browserify",
    },
  },
});
