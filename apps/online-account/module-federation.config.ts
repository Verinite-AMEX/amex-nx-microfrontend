import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'online-account',
  exposes: {
    './Routes': 'apps/online-account/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
