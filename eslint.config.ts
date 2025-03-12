import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
// @ts-expect-error No types available
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import vuePlugin from "eslint-plugin-vue";
import * as tseslint from "typescript-eslint";
// eslint-disable-next-line import/order
import vueParser from "vue-eslint-parser";

const isProduction = import.meta.env?.PROD || process.env.NODE_ENV === "production";

export default [
  {
    ignores: ["src/graphql/codegen/generated.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,

  // Import plugin
  {
    files: ["**/*.{js,ts,vue}"],
    settings: {
      "import/internal-regex": "^package/",
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Import sorting configuration
      "import/order": [
        "error",
        {
          distinctGroup: false,
          groups: [
            "builtin", // Node.js built-in modules
            "external", // Packages from node_modules
            "internal", // From the project using aliases (@/...)
            "parent", // From parent directories (../)
            "sibling", // From the same directory (./)
            "index", // From the same file
          ],
          pathGroups: [
            {
              pattern: "fast-check",
              group: "external",
              position: "after",
            },
            {
              pattern: "vitest",
              group: "external",
              position: "before",
            },
            {
              pattern: "vue",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          // Set `pathGroupsExcludedImportTypes` to `[]` to remove the default value of
          // ['builtin', 'external', 'internal'] so that `pathGroups` work on `external`.
          // https://github.com/import-js/eslint-plugin-import/blob/v2.31.0/docs/rules/order.md
          pathGroupsExcludedImportTypes: [],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],

      // Separate type imports
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    },
  },

  // Vue configuration
  {
    files: ["**/*.vue"],
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      ...vuePlugin.configs["vue3-recommended"].rules,
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
      "prettier/prettier": ["warn", { printWidth: 88 }],
    },
  },

  prettierConfig, // Turn off rules that conflict with prettier
];
