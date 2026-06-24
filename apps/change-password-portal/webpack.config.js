const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  // ── Remote name MUST match what the shell declares ──────────────
  // shell webpack.config.js: changePasswordPortal: 'changePasswordPortal@http://localhost:4212/remoteEntry.js'
  name: 'changePasswordPortal',

  // ── What this MFE exposes ────────────────────────────────────────
  // shell app.routes.ts: exposedModule: './Module'
  // shell app.routes.ts: .then(m => m.ChangePasswordRemoteEntryModule)
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
  publicPath: 'http://localhost:4215/',
  scriptType:  'text/javascript',
  uniqueName:  'changePasswordPortal',
};

module.exports = mfConfig;
