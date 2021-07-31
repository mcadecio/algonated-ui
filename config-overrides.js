const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function override(config) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["json", "java", "javascript"],
      filename: "static/[name].worker.js",
    })
  );
  return config;
};
