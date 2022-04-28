// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const fs = require("fs");
var webpack = require("webpack");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: "warning",
  configureWebpack: {
    plugins: [
      new monacoWebpackPlugin({ languages: ["python"] }),
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          PACKAGE_VERSION: '"' + version + '"',
        },
      }),
    ],
  },
  transpileDependencies: ["vue-meta", "vuetify"],
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
});
