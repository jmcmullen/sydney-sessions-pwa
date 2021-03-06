module.exports = {
  build: {},
  head: {},
  loading: { color: '#3B8070' },
  manifest: {
    theme_color: '#3B8070',
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo'],
  plugins: [
    { src: '~/plugins/fb-sdk', ssr: false },
    { src: '~/plugins/element-ui' },
    { src: '~/plugins/apollo' },
  ],
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js',
    },
  },
  css: ['element-ui/lib/theme-chalk/index.css'],
  env: {
    HTTP_URI: 'https://api.graph.cool/simple/v1/sydneysessions',
    WS_URI: 'wss://subscriptions.ap-northeast-1.graph.cool/v1/sydneysessions',
  },
  manifest: {
    name: 'Sydney Sessions',
  },
};
