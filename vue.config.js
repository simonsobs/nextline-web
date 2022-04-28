// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: "warning",
  configureWebpack: {
    plugins: [
      new monacoWebpackPlugin({ languages: ["python"] }),
      new NodePolyfillPlugin(),
    ],
  },
  transpileDependencies: ["vue-meta", "vuetify"],
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
});
