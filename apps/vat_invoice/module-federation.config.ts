import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'vat_invoice',
  exposes: {
    './Routes': 'apps/vat_invoice/src/app/remote-entry/entry.routes.ts',
  },
};
export default config;
