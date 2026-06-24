import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'ui-components',
  exposes: {
    './Routes': 'apps/ui-components/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
