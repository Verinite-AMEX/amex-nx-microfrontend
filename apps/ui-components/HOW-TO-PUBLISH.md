# How to Publish @ui-components/ui to npm

## Overview

There are **3 ways** your teammates can get this library:

| Option | Best for | Command |
|---|---|---|
| **A. Private npm registry (Verdaccio)** | Team/intranet, no internet needed | `npm install @ui-components/ui` |
| **B. GitHub Packages** | Team already uses GitHub | `npm install @ui-components/ui` |
| **C. Public npmjs.com** | Open source, public | `npm install @ui-components/ui` |

---

## Step 1 — Install ng-packagr (one time)

ng-packagr is the tool that compiles Angular libraries into a publishable format.

```bash
npm install ng-packagr --save-dev  // we can skip, this library added in package.json already
```

## Step 2 — Build the library

```bash
npx nx run ui:build:production
```

This creates a `dist/ui-components/` folder — that's your publishable package.

Check the output:
```
dist/ui-components/
  ├── esm2022/          ← modern ES modules
  ├── fesm2022/         ← flattened ES modules
  ├── index.d.ts        ← TypeScript types
  ├── package.json      ← package metadata
  └── README.md
```

---

## Option A — Verdaccio (Private local registry) ✅ RECOMMENDED for teams

Verdaccio is a free private npm registry you run yourself. No internet, no accounts needed.

### On the machine that hosts the registry (once only):

```bash
# Install Verdaccio globally
npm install -g verdaccio

# Start it (runs on http://localhost:4873)
verdaccio
```

To keep Verdaccio running in background:
```bash
npm install -g pm2
pm2 start verdaccio
pm2 save
```

### Publish your library:

```bash
cd dist/ui-components

# Create an account on Verdaccio (first time)
npm adduser --registry http://localhost:4873

# Publish
npm publish --registry http://localhost:4873

# To set registry
npm config set registry https://registry.npmjs.org/
npm config set @ui-components:registry http://localhost:4873
```

### Your teammates install it:

Tell them to add this `.npmrc` in their project root:

```
@ui-components:registry=http://<YOUR-SERVER-IP or localhost>:4873
```

Then simply:
```bash
npm install @ui-components/ui
```

---

## Option B — GitHub Packages

### Publish:

1. Create a GitHub repo for the monorepo (or use existing).

2. Add `.npmrc` to the **root of your monorepo**:
   ```
   @ui-components:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. In `libs/ui/package.json`, set `"repository"`:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/YOUR-ORG/YOUR-REPO.git"
   }
   ```

4. Build and publish:
   ```bash
   nx run ui:build:production
   cd dist/ui-components
   npm publish --registry https://npm.pkg.github.com
   ```

### Your teammates install it:

They add to their `.npmrc`:
```
@ui-components:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<THEIR_GITHUB_TOKEN>
```

Then:
```bash
npm install @ui-components/ui
```

---

## Option C — Public npmjs.com

### Publish:

```bash
# Login to npmjs.com (need an account at npmjs.com)
npm login

# Build
nx run ui:build:production

# Publish
cd dist/ui-components
npm publish --access public
```

### Teammates install:

```bash
npm install @ui-components/ui
```

No extra config needed.

---

## How teammates USE the library in their Angular project

### 1. Install

```bash
npm install @ui-components/ui
```

### 2. Use any component — all are standalone, just import and use:

```typescript
import {
  AmexLoginFormComponent,
  AmexStatementViewerComponent,
  AmexOffersPanelComponent,
  // ... any component from the lib
} from '@ui-components/ui';

@Component({
  standalone: true,
  imports: [
    AmexLoginFormComponent,
    AmexStatementViewerComponent,
  ],
  template: `
    <amex-login-form (login)="onLogin($event)"></amex-login-form>
    <amex-statement-viewer [statements]="months"></amex-statement-viewer>
  `
})
export class MyPageComponent {
  months = [
    { label: 'October 2029', isLatest: true },
    { label: 'September 2029' },
  ];

  onLogin(creds: { username: string; password: string }) {
    console.log(creds);
  }
}
```

### 3. No extra module imports needed

Every component in `@ui-components/ui` is a standalone Angular component.  
Just add it to the `imports: []` array and use its selector in the template.

---

## Updating the version

Whenever you add new components or fix bugs:

```bash
# 1. Bump version in libs/ui/package.json
#    e.g. "version": "1.0.0" → "1.1.0"

# 2. Rebuild
nx run ui:build:production

# 3. Re-publish
cd dist/ui-components
npm publish --registry <your-registry>
```

Teammates update with:
```bash
npm update @ui-components/ui
```

---

## Quick reference

| Task | Command |
|---|---|
| Build the library | `nx run ui:build:production` |
| Publish (Verdaccio) | `cd dist/ui-components && npm publish --registry http://localhost:4873` |
| UnPublish (Verdaccio) | `npm unpublish @ui-components/ui --force --registry http://localhost:4873` |
| Publish (GitHub) | `cd dist/ui-components && npm publish --registry https://npm.pkg.github.com` |
| Publish (public npm) | `cd dist/ui-components && npm publish --access public` |
| Teammate installs | `npm install @ui-components/ui` |
