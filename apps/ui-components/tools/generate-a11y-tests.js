#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'libs', 'ui', 'src', 'lib');
const OUT_DIR = path.join(SRC, '__generated__', 'a11y');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = glob.sync(path.join(SRC, '**', '*.ts'))
  .filter(f => !f.endsWith('.stories.ts') && !f.endsWith('.spec.ts') && !f.includes('__generated__') && !f.includes('/__tests__/'));

function findClassName(src) {
  const m = src.match(/export\s+class\s+([A-Za-z0-9_]+)/);
  return m ? m[1] : null;
}

files.forEach(file => {
  const src = fs.readFileSync(file, 'utf8');
  if (!/@Component\(/.test(src)) return;
  const className = findClassName(src);
  if (!className) return;

  const relImport = './' + path.relative(OUT_DIR, file).replace(/\\/g, '/').replace(/\.ts$/, '');
  const testFileName = path.join(OUT_DIR, `${className}.a11y.spec.ts`);
  if (fs.existsSync(testFileName)) return;

  const testContent = `import { render } from '@testing-library/angular';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${className} } from '${relImport}';

expect.extend({ toHaveNoViolations });

describe('${className} accessibility', () => {
  it('should have no detectable accessibility violations', async () => {
    const { container } = await render(${className}, {});
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
`;

  fs.writeFileSync(testFileName, testContent, 'utf8');
  console.log('Generated', testFileName);
});

console.log('A11y test generation complete.');
