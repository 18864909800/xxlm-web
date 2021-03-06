const appConfig = require('./src/app.config')
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  publicPath:  "./", // 默认'/'，部署应用包时的基本 URL
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    performance: {
      // Only enable performance hints for production builds,
      // outside of tests.
      hints:
        process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning',
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    port : 8081
    // ...(process.env.API_BASE_URL
    //   ? // Proxy API endpoints to the production base URL.
    //     { proxy: { '/api': { target: process.env.API_BASE_URL } } }
    //   : // Proxy API endpoints a local mock API.
    //     { before: require('./tests/mock-api') }),
  },
}
