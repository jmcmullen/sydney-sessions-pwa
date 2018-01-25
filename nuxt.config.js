module.exports = {
  build: {},
  head: {},
  loading: { color: '#3B8070' },
  manifest: {
    theme_color: '#3B8070',
  },
  modules: ['@nuxtjs/pwa'],
  plugins: [
    { src: '~/plugins/element-ui', ssr: false },
    { src: '~/plugins/fb-sdk', ssr: false },
  ],
  css: ['element-ui/lib/theme-chalk/index.css'],
};
