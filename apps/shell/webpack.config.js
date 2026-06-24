const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const mfConfig = withModuleFederationPlugin({
  remotes: {
    oms: "http://localhost:4201/remoteEntry.js",
    "online-account": "http://localhost:4202/remoteEntry.js",
    bcrb: "http://localhost:4208/remoteEntry.js",
    statement: "http://localhost:4212/remoteEntry.js",
    vat_invoice: "http://localhost:4213/remoteEntry.js",
    "bta-portal": "http://localhost:4203/remoteEntry.js",
    "offers-portal": "http://localhost:4204/remoteEntry.js",
    "supplementary-portal": "http://localhost:4205/remoteEntry.js",
    "wearables-portal": "http://localhost:4206/remoteEntry.js",
    "pay-with-points-portal": "http://localhost:4207/remoteEntry.js",
    lounge: "http://localhost:4209/remoteEntry.js",
    "cen-lcy-exc": "http://localhost:4210/remoteEntry.js",
    "centurion-portal": "http://localhost:4211/remoteEntry.js",
    "ui-components": "http://localhost:4214/remoteEntry.js",
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }),
  },
});

mfConfig.output = {
  ...mfConfig.output,
  publicPath: "http://localhost:4200/",
  scriptType: "text/javascript",
};

module.exports = mfConfig;
