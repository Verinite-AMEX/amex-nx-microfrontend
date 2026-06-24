import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['oms',            'http://localhost:4201/'],
    ['online-account', 'http://localhost:4202/'],
    ['bcrb',           'http://localhost:4208/'],
    ['statement',      'http://localhost:4212/'],
    ['vat_invoice',    'http://localhost:4213/'],
    ['soc-roc',        'http://localhost:4214/'],
  ],
};

export default config;
