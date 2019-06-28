module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3001,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_API,
        changeOrigin: true,
      },
    },
  },
};
