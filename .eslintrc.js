module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": import.meta.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": import.meta.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "vue/no-unused-components": "off",
    "vue/multi-word-component-names": "off",
    "vue/script-setup-uses-vars": 1,
    "@typescript-eslint/no-var-requires": "off",
  },
};
