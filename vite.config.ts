import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import loadVersion from "vite-plugin-package-version";
import graphql from "@rollup/plugin-graphql";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default ({ mode }) => {
  // loadEnv: https://stackoverflow.com/a/66389044/7309855
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: { port: 8081 },
    plugins: [
      vue(),
      loadVersion(),
      // @ts-ignore
      graphql(),
      monacoEditorPlugin({
        languageWorkers: ["editorWorkerService"],
        publicPath: "monacoeditorwork", // default
      }),
    ],
    base: process.env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        path: "path-browserify",
      },
    },
  });
};
