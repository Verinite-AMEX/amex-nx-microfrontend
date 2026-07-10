import { ModuleFederationConfig } from "@nx/module-federation";

const config: ModuleFederationConfig = {
  name: "bcrb",
  exposes: {
    "./Routes": "apps/bcrb/src/app/remote-entry/entry.routes.ts",
  },
};

export default config;
