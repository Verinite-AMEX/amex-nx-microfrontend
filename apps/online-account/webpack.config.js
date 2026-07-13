const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const mfConfig = withModuleFederationPlugin({
  name: "online-account",
  exposes: {
    "./Routes": "./apps/online-account/src/app/remote-entry/entry.routes.ts",
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
  publicPath: "http://localhost:4201/",
  scriptType: "text/javascript",
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
