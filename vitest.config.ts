import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import type { UserConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig({ mode: "development" }) as UserConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      setupFiles: ["./src/tests/setup.ts"],
      alias: [
        {
          // https://github.com/vitest-dev/vitest/discussions/1806#discussioncomment-3570047
          find: /^monaco-editor$/,
          replacement:
            __dirname + "/node_modules/monaco-editor/esm/vs/editor/editor.api",
        },
      ],
    },
  })
);
