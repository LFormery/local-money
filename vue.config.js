module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'local',
      enableInSFC: true,
    },
  },
  pwa: {
    name: 'NeyMo',
    themeColor: '#189B73',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // // swSrc is required in InjectManifest mode.
      // swSrc: 'dev/sw.js',
      // // ...other Workbox options...
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/gloabal.scss";
        `,
      },
    },
  },
};
