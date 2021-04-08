const path = require('path');

module.exports = {
  id: 'default',
  distDir: 'dist/.ssr',
  viewsDir: './src/views',
  staticViews: [],
  webpack: (
    config /* webpack.Configuration */,
    env /* 'development' | 'production' */,
  ) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        '@src': path.resolve(__dirname, './src'),
      },
    };
    return config;
  },
};
