const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'wearablesPortal',
  exposes: {
      './Routes': './apps/soc-roc/src/app/remote-entry/entry.routes.ts',
    },
  shared: {
    ...shareAll({
      singleton:       true,
      strictVersion:   false,
      requiredVersion: 'auto',
    }),
  },
});

mfConfig.output = {
  ...mfConfig.output,
  publicPath: 'http://localhost:4214/',
  scriptType: 'text/javascript',
};

module.exports = mfConfig;
