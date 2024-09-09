const webpack = require("webpack");
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

  // Adicionar as feature flags do Vue para resolver o erro de hidratação
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Desabilita o Vue Devtools em produção
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Desabilita o aviso de hidratação
      }),
    ],
  },
});
