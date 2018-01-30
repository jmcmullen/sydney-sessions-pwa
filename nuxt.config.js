module.exports = {
  build: {},
  head: {},
  loading: { color: '#409EFF' },
  manifest: {
    theme_color: '#409EFF',
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
  },
  manifest: {
    name: 'Sessions',
    short_name: 'Sessions',
    ogTitle: 'sessions.sydney',
    ogDescription: 'Upcoming dance music events in Sydney, Australia',
  },
};
