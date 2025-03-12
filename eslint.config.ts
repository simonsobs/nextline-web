import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import vuePlugin from "eslint-plugin-vue";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

// @ts-ignore
import importPlugin from "eslint-plugin-import";

const isProduction = import.meta.env?.PROD || process.env.NODE_ENV === "production";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,

  // Import plugin
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },

  // Vue configuration
  {
    files: ["**/*.vue"],
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      ...vuePlugin.configs.essential.rules,
      "vue/multi-word-component-names": "off",
      "vue/script-setup-uses-vars": "warn",
      "vue/no-unused-components": "off",
    },
  },

  // Global configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": isProduction ? "warn" : "off",
      "no-debugger": isProduction ? "warn" : "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-var-requires": "off",
      "prettier/prettier": "warn",
    },
  },

  prettierConfig, // Turn off rules that conflict with prettier
];
