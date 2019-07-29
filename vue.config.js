const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '@/styles/base/normalize.scss';
          @import '@/styles/base/variables.scss';
          @import '@/styles/base/mixin.scss';
          @import '@/styles/base/base.scss';
          @import '@/styles/base/font.scss';
        `,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, '@/styles/global.scss')],
    },
  },
};
