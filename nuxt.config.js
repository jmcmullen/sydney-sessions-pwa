const { resolve } = require('path');

module.exports = {
  build: {},
  head: {},
  loading: { color: '#409EFF' },
  manifest: {
    theme_color: '#409EFF',
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo', 'nuxt-sass-resources-loader'],
  sassResources: [
    resolve(__dirname, 'assets/styles/settings/variables.scss'),
    resolve(__dirname, 'assets/styles/vendor/avalanche.scss'),
  ],
  css: ['normalize.css', '~/assets/styles/global.scss'],
  plugins: [
    { src: '~/plugins/fb-sdk', ssr: false },
    { src: '~plugins/ga.js', ssr: false },
    // { src: '~/plugins/element-ui' },
    { src: '~/plugins/apollo' },
  ],
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js',
    },
  },
  env: {
    HTTP_URI: 'https://api.graph.cool/simple/v1/sydneysessions',
  },
  manifest: {
    name: 'Sessions',
    short_name: 'Sessions',
    ogTitle: 'sessions.sydney',
    ogDescription: 'Upcoming dance music events in Sydney, Australia',
  },
};
