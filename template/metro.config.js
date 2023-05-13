/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
module.exports = {
  resolver: {
    // Add any additional paths you want to support here
    extraNodeModules: {
      '@src': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@atoms': path.resolve(__dirname, '/src/components/atoms'),
      '@molecules': path.resolve(__dirname, '/src/components/molecules'),
      '@organisms': path.resolve(__dirname, '/src/components/organisms'),
      '@templates': path.resolve(__dirname, '/src/components/templates'),
      '@svg': path.resolve(__dirname, '/src/components/svg'),

      '@screens': path.resolve(__dirname, '/src/components/screens'),
      '@utils': path.resolve(__dirname, '/src/utils'),
      '@assets': path.resolve(__dirname, '/src/assets'),
      '@constants': path.resolve(__dirname, '/src/constants'),
      '@hooks': path.resolve(__dirname, '/src/hooks'),
      '@navigation': path.resolve(__dirname, '/src/navigation'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@HOC': path.resolve(__dirname, '/src/HOC'),
      '@cofigs': path.resolve(__dirname, '/src/configs'),
    },
    // // Make sure the "node_modules" directory is excluded from module resolution
    // blacklistRE: defaultConfig.resolver.blacklistRE,
    // // Make sure the "index" files are resolved first
    // sourceExts: [...defaultConfig.resolver.sourceExts, 'index.ts', 'index.tsx'],
  },
};
