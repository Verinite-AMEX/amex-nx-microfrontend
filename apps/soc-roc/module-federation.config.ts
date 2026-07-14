import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'soc-roc',
  exposes: {
    './Routes': 'apps/soc-roc/src/app/remote-entry/entry.routes.ts',
  },
};
export default config;