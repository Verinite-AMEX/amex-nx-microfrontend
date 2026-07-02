const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'authApp',
  exposes: {
    './LoginPage': './src/app/login-page.component.ts',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    }),
  },
});

mfConfig.output = {
  ...mfConfig.output,
  publicPath: 'http://localhost:4216/',
  scriptType: 'text/javascript',
};

module.exports = mfConfig;