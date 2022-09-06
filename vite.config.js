import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
import gql from "vite-plugin-simple-gql";

export default defineConfig({
  plugins: [vue(), gql()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
