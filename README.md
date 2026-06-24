# AMEX UI — NX Monorepo Microfrontend Architecture

## Overview

This repository is an **NX monorepo** that hosts all AMEX UI micro-frontends and shared libraries under a single version-controlled workspace. No application logic has been changed; only the build infrastructure, configuration files, and workspace plumbing have been updated.

---

## Workspace layout

```
amex-ui-monorepo/
├── apps/                          ← All micro-frontend applications
│   ├── shell/                     ← HOST (port 4200) – NX Module Federation
│   ├── oms/                       ← REMOTE (port 4201) – NX MF, exposes ./Routes
│   ├── online-account/            ← REMOTE (port 4202) – NX MF, exposes ./Routes
│   ├── bcrb/                      ← REMOTE (port 4201) – NX MF, exposes ./Routes
│   ├── statement/                 ← REMOTE (port 4203) – NX MF, exposes ./Routes
│   ├── vat_invoice/               ← REMOTE (port 4202) – NX MF, exposes ./Routes
│   ├── bta-portal/                ← REMOTE (port 4203) – legacy @angular-architects/mf
│   ├── offers-portal/             ← REMOTE (port 4204) – legacy @angular-architects/mf
│   ├── supplementary-portal/      ← REMOTE (port 4205) – legacy @angular-architects/mf
│   ├── wearables-portal/          ← REMOTE (port 4206) – legacy @angular-architects/mf
│   ├── pay-with-points-portal/    ← REMOTE (port 4207) – legacy @angular-architects/mf
│   ├── lounge/                    ← REMOTE (port 4209) – legacy @angular-architects/mf
│   ├── cen-lcy-exc/               ← REMOTE (port 4210) – legacy @angular-architects/mf
│   └── centurion-portal/          ← REMOTE (port 4211) – legacy @angular-architects/mf
│
├── libs/
│   ├── shared-ui/                 ← Shared Angular components, directives, pipes
│   │   └── src/
│   │       ├── index.ts           ← Barrel export
│   │       └── lib/shared-ui.module.ts
│   └── shared-utils/              ← Shared services, guards, interceptors, tokens
│       └── src/
│           ├── index.ts
│           └── lib/
│               ├── shared-utils.module.ts
│               ├── auth-token.interceptor.ts   ← JWT interceptor (was duplicated per-app)
│               └── shell.token.ts              ← InjectionToken for shell → remote context
│
├── package.json                   ← Single root package.json (ONE node_modules)
├── nx.json                        ← NX workspace config (caching, plugins, generators)
├── tsconfig.base.json             ← Root TypeScript config (path aliases for libs)
└── eslint.config.mjs              ← Workspace-wide ESLint + NX boundary rules
```

---

## Two tiers of remotes

| Tier          | Apps                                                                                                                             | MF Library                              | Config file                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------- |
| **NX-native** | shell, oms, online-account, bcrb, statement, vat_invoice                                                                         | `@nx/module-federation`                 | `module-federation.config.ts` + `webpack.config.ts` |
| **Legacy**    | bta-portal, offers-portal, supplementary-portal, wearables-portal, pay-with-points-portal, lounge, cen-lcy-exc, centurion-portal | `@angular-architects/module-federation` | `webpack.config.js`                                 |

Both tiers coexist. The shell's `module-federation.config.ts` declares NX remotes; legacy remotes are loaded dynamically via `loadRemoteModule` in the shell's routing.

---

## Getting started

```bash
# Install all dependencies (single node_modules at workspace root)
npm install

# Serve individual apps
npx nx serve shell
npx nx serve oms

# Serve all concurrently
npm run start:all

# Build everything
npm run build:all

# Build only what's affected by your change
npm run build:affected

# View the dependency graph
npm run graph

#Run verdaccio
npx verdaccio
```

---

## Shared libraries

### `@amex/shared-ui` (`libs/shared-ui`)

Angular components, directives, and pipes used by 2+ apps. Import in any app:

```ts
import { SharedUiModule } from "@amex/shared-ui";
```

### `@amex/shared-utils` (`libs/shared-utils`)

Services, guards, interceptors, and tokens shared across apps.

```ts
import { AuthTokenInterceptor, SHELL_TOKEN } from "@amex/shared-utils";
```

Path aliases are pre-configured in `tsconfig.base.json`.

---

## NX caching & affected commands

NX tracks the dependency graph. Running `nx affected --target=build` builds only the apps/libs touched by your current branch, which dramatically speeds up CI.

```bash
# See what's affected vs. main
npx nx affected:graph

# Test only affected projects
npx nx affected --target=test
```

---

## Adding a new micro-frontend

```bash
# Generate a new NX-native remote
npx nx g @nx/angular:remote my-new-app --host=shell --port=4212

# Generate a new shared library
npx nx g @nx/angular:library my-new-lib --directory=libs/my-new-lib
```

---

## Port reference

| App                    | Port |
| ---------------------- | ---- |
| shell                  | 4200 |
| oms                    | 4201 |
| online-account         | 4202 |
| bcrb                   | 4201 |
| statement              | 4203 |
| vat_invoice            | 4202 |
| bta-portal             | 4203 |
| offers-portal          | 4204 |
| supplementary-portal   | 4205 |
| wearables-portal       | 4206 |
| pay-with-points-portal | 4207 |
| lounge                 | 4209 |
| cen-lcy-exc            | 4210 |
| centurion-portal       | 4211 |
| ui-components          | 4214 |
