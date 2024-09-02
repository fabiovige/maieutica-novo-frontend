const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost", // URL do backend Laravel
        changeOrigin: true,
      },
    },
  },
});
