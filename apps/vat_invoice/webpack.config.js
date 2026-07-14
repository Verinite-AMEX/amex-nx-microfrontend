const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'vat_invoice',
  exposes: {
    './Routes': './apps/vat_invoice/src/app/remote-entry/entry.routes.ts',
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
  publicPath: 'http://localhost:4213/',
  scriptType: 'text/javascript',
};
mfConfig.devServer = {
  ...mfConfig.devServer,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
};
module.exports = mfConfig;
