import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const STORYBOOK_BASE = process.env.STORYBOOK_URL || 'http://localhost:4400';
const RESULTS_DIR = path.join(process.cwd(), 'e2e', 'results');
const BASELINE_PATH = path.join(process.cwd(), '.github', 'a11y', 'baseline.json');

if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });

async function runAxeOnStory(page, storyPath: string) {
  await page.goto(`${STORYBOOK_BASE}/iframe.html?id=${storyPath}`);
  // wait for content to load
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).analyze();
  // write raw results for triage
  const outFile = path.join(RESULTS_DIR, `${storyPath.replace(/[^a-z0-9_-]/gi, '_')}.json`);
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  return results;
}

function readBaseline() {
  try {
    if (!fs.existsSync(BASELINE_PATH)) return null;
    const raw = fs.readFileSync(BASELINE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read baseline:', e.message);
    return null;
  }
}

function writeBaselineDraft(baselineObj: any) {
  const out = path.join(RESULTS_DIR, 'baseline.json');
  fs.writeFileSync(out, JSON.stringify(baselineObj, null, 2));
  console.log(`Wrote baseline draft to ${out}. Commit this file to .github/a11y/baseline.json to enable gating.`);
}

test.describe('Storybook accessibility checks', () => {
  const baseline = readBaseline();
  const baselineMissing = !baseline;
  const baselineDraft: Record<string, any> = {};

  async function assertNoNewViolations(results, storyPath: string) {
    const curIds: string[] = (results.violations || []).map((v: any) => v.id);
    // populate baseline draft
    baselineDraft[storyPath] = { ids: curIds, generatedAt: new Date().toISOString() };

    if (baselineMissing) {
      // first-run: create draft baseline and do not fail
      console.log(`Baseline missing — capturing current violations for ${storyPath} (no failure).`);
      return;
    }

    const baseIds: string[] = (baseline[storyPath]?.ids) || [];
    const newIds = curIds.filter((id) => !baseIds.includes(id));

    if (newIds.length) {
      // annotate each new violation for GitHub Actions
      for (const id of newIds) {
        const v = results.violations.find((vv: any) => vv.id === id);
        const nodes = v.nodes || [];
        const nodeTargets = nodes.map((n: any) => (n.target || []).join(', ')).join(' | ');
        const message = `${v.id}: ${v.help} (${v.helpUrl})\nImpact: ${v.impact}\nNodes: ${nodeTargets}`;
        const escaped = message.replace(/\n/g, '%0A');
        console.log(`::error title=axe/${v.id} file=${storyPath}::${escaped}`);
      }
    }

    expect(newIds.length).toBe(0);
  }

  test('all storybook stories accessibility (baseline gated)', async ({ page }) => {
    // fetch Storybook stories.json to enumerate all stories
    const resp = await page.request.get(`${STORYBOOK_BASE}/stories.json`);
    if (resp.status() !== 200) throw new Error('Failed to fetch stories.json from Storybook');
    const json = await resp.json();
    const stories = json.stories || {};
    const storyIds = Object.keys(stories);

    for (const id of storyIds) {
      const story = stories[id];
      // skip docs-only entries
      if (story && story.isDocsOnly) continue;
      const storyPath = id; // story.id is already the id used in iframe.html?id=
      const results = await runAxeOnStory(page, storyPath);
      await assertNoNewViolations(results, storyPath);
    }

    if (baselineMissing) {
      // write draft baseline for maintainers to review and commit
      writeBaselineDraft(baselineDraft);
    }
  });
});
