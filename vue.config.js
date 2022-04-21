// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new monacoWebpackPlugin({ languages: ["python"] })],
  },
  transpileDependencies: ["vuetify"],
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
};
