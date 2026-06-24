import { setRemoteDefinitions } from '@nx/module-federation/angular';

setRemoteDefinitions({
  'oms':            'http://localhost:4201/',
  'online-account': 'http://localhost:4202/',
  'bcrb':           'http://localhost:4208/',
  'statement':      'http://localhost:4212/',
  'vat_invoice':    'http://localhost:4213/',
}).then(() => import('./bootstrap').catch(err => console.error(err)));
