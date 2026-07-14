import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'oms',
  exposes: {
    './Routes': 'oms/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
