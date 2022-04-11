const monacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  configureWebpack: {
    plugins: [new monacoWebpackPlugin()],
  },
  transpileDependencies: ["vuetify"],
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
};
