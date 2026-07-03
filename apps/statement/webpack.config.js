const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const mfConfig = withModuleFederationPlugin({
  name: "statement",

  exposes: {
    "./Routes": "./apps/statement/src/app/remote-entry/entry.routes.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: "auto",
    }),
  },
});

// Module Federation Output Configuration
mfConfig.output = {
  ...mfConfig.output,
  publicPath: "http://localhost:4212/",
  scriptType: "text/javascript",
};

// Enable CORS so the Shell (4200) can load this remote
mfConfig.devServer = {
  ...mfConfig.devServer,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
};

module.exports = mfConfig;
