#!/usr/bin/env node
/**
 * publish-ui.js
 * Automates the build -> (unpublish) -> publish cycle for @ui-components/ui
 * against a Verdaccio registry, so you never have to run the manual
 * unpublish/publish commands by hand again.
 *
 * Usage (run from the Nx workspace root):
 *
 *   node tools/publish-ui.js                 # unpublish-if-exists + publish current version (matches your table)
 *   node tools/publish-ui.js --bump=patch    # auto bump 0.0.0 -> 0.0.1, build, publish (no unpublish needed)
 *   node tools/publish-ui.js --bump=minor
 *   node tools/publish-ui.js --bump=major
 *   node tools/publish-ui.js --unpublish-only
 *   node tools/publish-ui.js --registry=https://npm.pkg.github.com
 *   node tools/publish-ui.js --dry-run
 *
 * Env vars (all optional, override CLI defaults):
 *   VERDACCIO_REGISTRY   default: http://localhost:4873
 *   NX_PROJECT            default: ui
 *   NX_BUILD_TARGET        default: build:production
 *   DIST_DIR               default: dist/ui-components
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ---------- config ----------
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, val] = arg.replace(/^--/, '').split('=');
  acc[key] = val === undefined ? true : val;
  return acc;
}, {});

const REGISTRY = args.registry || process.env.VERDACCIO_REGISTRY || 'http://localhost:4873';
const PROJECT = args.project || process.env.NX_PROJECT || 'ui';
const BUILD_TARGET = args.target || process.env.NX_BUILD_TARGET || 'build:production';
const DIST_DIR = path.resolve(process.cwd(), args.distDir || process.env.DIST_DIR || 'dist/ui-components');
const BUMP = args.bump || null; // patch | minor | major | null
const UNPUBLISH_ONLY = !!args['unpublish-only'];
const DRY_RUN = !!args['dry-run'];

// ---------- helpers ----------
function log(msg) {
  console.log(`\x1b[36m[publish-ui]\x1b[0m ${msg}`);
}
function warn(msg) {
  console.log(`\x1b[33m[publish-ui]\x1b[0m ${msg}`);
}
function err(msg) {
  console.error(`\x1b[31m[publish-ui]\x1b[0m ${msg}`);
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`);
  if (DRY_RUN) return '';
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', ...opts }).trim();
}

function runInherit(cmd, opts = {}) {
  log(`$ ${cmd}`);
  if (DRY_RUN) return;
  execSync(cmd, { stdio: 'inherit', ...opts });
}

function sleep(ms) {
  Atomics.wait(
    new Int32Array(new SharedArrayBuffer(4)),
    0,
    0,
    ms
  );
}

function readPkg(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found at ${pkgPath}. Did the build run?`);
  }
  return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
}

function versionExistsOnRegistry(pkgName, version) {
  try {
    const out = run(`npm view ${pkgName}@${version} version --registry ${REGISTRY}`, { stdio: 'pipe' });
    return out === version;
  } catch (e) {
    // npm view throws (E404) when the version/package doesn't exist yet — that's fine.
    return false;
  }
}

function packageExistsOnRegistry(pkgName) {
  try {
    run(`npm view ${pkgName} versions --registry ${REGISTRY}`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    return false;
  }
}

// ---------- steps ----------
function build() {
  log(`Building project "${PROJECT}" (target: ${BUILD_TARGET})...`);
  runInherit(`npx nx run ${PROJECT}:${BUILD_TARGET}`);
}

function bumpVersion() {
  if (!BUMP) return;
  log(`Bumping version in ${DIST_DIR} (${BUMP})...`);
  // npm version writes the new version into dist/ui-components/package.json directly,
  // without needing a git repo there (--no-git-tag-version).
  runInherit(`npm version ${BUMP} --no-git-tag-version`, { cwd: DIST_DIR });
}

function unpublishIfExists(pkgName, version) {
  if (versionExistsOnRegistry(pkgName, version)) {
    warn(`${pkgName}@${version} already exists on ${REGISTRY} — unpublishing first.`);
    try {
      run(`npm unpublish ${pkgName}@${version} --force --registry ${REGISTRY}`);
    } catch (e) {
      // Fallback: unpublish the whole package (some Verdaccio configs only allow full unpublish)
      warn(`Version-level unpublish failed, retrying full package unpublish...`);
      run(`npm unpublish ${pkgName} --force --registry ${REGISTRY}`);
    }
    // Verdaccio can be briefly inconsistent right after an unpublish; give it a moment.
    if (!DRY_RUN) sleep(2000);
  } else {
    log(`${pkgName}@${version} is not on the registry yet — nothing to unpublish.`);
  }
}

function unpublishAll(pkgName) {
  if (packageExistsOnRegistry(pkgName)) {
    warn(`Removing all published versions of ${pkgName} from ${REGISTRY}...`);
    run(`npm unpublish ${pkgName} --force --registry ${REGISTRY}`);
  } else {
    log(`${pkgName} has nothing published on ${REGISTRY}.`);
  }
}

function publish() {
  log(`Publishing from ${DIST_DIR} to ${REGISTRY}...`);
  runInherit(`npm publish --registry ${REGISTRY}`, { cwd: DIST_DIR });
}

// ---------- main ----------
(function main() {
  log(`Registry: ${REGISTRY}`);

  if (UNPUBLISH_ONLY) {
    const pkg = readPkg(DIST_DIR) ? readPkg(DIST_DIR) : null;
    // If dist doesn't exist yet, we still know the package name from libs/ui/package.json
    const pkgName = pkg ? pkg.name : readPkg(path.resolve(process.cwd(), 'libs/ui')).name;
    unpublishAll(pkgName);
    log('Done (unpublish-only).');
    return;
  }

  build();
  bumpVersion();

  const pkg = readPkg(DIST_DIR);
  log(`Package: ${pkg.name}@${pkg.version}`);

  if (!BUMP) {
    // Same-version workflow (mirrors your manual table): unpublish that exact
    // version if it's already there, then publish.
    unpublishIfExists(pkg.name, pkg.version);
  }

  publish();
  log(`✅ Published ${pkg.name}@${pkg.version} to ${REGISTRY}`);
  log(`Teammates can now run: npm install ${pkg.name}@${pkg.version} --registry ${REGISTRY}`);
})();
