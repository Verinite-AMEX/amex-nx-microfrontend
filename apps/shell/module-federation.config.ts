import { ModuleFederationConfig } from "@nx/module-federation";

// OMS and online-account are NX-native remotes (expose Routes)
// Legacy remotes are loaded via dynamic import in app.routes.ts
const config: ModuleFederationConfig = {
  name: "shell",
  remotes: [
<<<<<<< Updated upstream
    ['oms',            'http://localhost:4201/'],
    ['online-account', 'http://localhost:4202/'],
    ['bcrb',           'http://localhost:4208/'],
    ['statement',      'http://localhost:4212/'],
    ['vat_invoice',    'http://localhost:4213/'],
=======
    ["oms", "http://localhost:4201/"],
    ["online-account", "http://localhost:4202/"],
    ["bcrb", "http://localhost:4201/"],
    ["statement", "http://localhost:4203/"],
    ["vat_invoice", "http://localhost:4202/"],
    ["ui-components", "http://localhost:4214/"],
>>>>>>> Stashed changes
  ],
};

export default config;
