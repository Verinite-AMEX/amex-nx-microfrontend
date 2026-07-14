const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'changePasswordPortal',
  exposes: {
  './Module': './apps/change-password-portal/src/app/entry.module.ts',
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
  scriptType:  'text/javascript',
  uniqueName:  'changePasswordPortal',
};

module.exports = mfConfig;
