import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import loadVersion from "vite-plugin-package-version";
import graphql from "@rollup/plugin-graphql";
// import monacoEditorPlugin from "vite-plugin-monaco-editor";
import monacoEditorPluginModule from "vite-plugin-monaco-editor";
import { visualizer } from "rollup-plugin-visualizer";

// A temporary fix for the issue on vite-plugin-monaco-editor:
// https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21#issuecomment-1827562674
const isObjectWithDefaultFunction = (
  module: unknown
): module is { default: typeof monacoEditorPluginModule } =>
  module != null &&
  typeof module === "object" &&
  "default" in module &&
  typeof module.default === "function";

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule)
  ? monacoEditorPluginModule.default
  : monacoEditorPluginModule;
//

export default ({ mode }) => {
  // loadEnv: https://stackoverflow.com/a/66389044/7309855
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: { port: 8081 },
    esbuild: { target: "es2022" },
    plugins: [
      vue(),
      vuetify({
        autoImport: { labs: true },
        styles: { configFile: "src/styles/vuetify.scss" },
      }),
      loadVersion(),
      // @ts-ignore
      graphql(),
      monacoEditorPlugin({
        languageWorkers: ["editorWorkerService"],
        publicPath: "monacoeditorwork", // default
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html", // will be saved in project's root
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "monaco-editor-import": ["@/utils/monaco-editor"],
            "monaco-editor": ["monaco-editor"],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["monaco-editor"],
    },
    base: process.env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        path: "path-browserify",
      },
    },
    define: {
      // for vitest in-source tests
      "import.meta.vitest": "undefined",
    },
  });
};
