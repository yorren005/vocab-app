/**
 * Structural Layout Optimizer (Milestone 2):
 * 1. Repairs any duplicate YAML frontmatter blocks (e.g. BOM-split `--- ... --- \ufeff--- ... ---`).
 * 2. Moves the existing `> [!status] 🎯 **Status:**` + `dataviewjs` Apple Glide Toggle block
 *    from the bottom of individual word `.md` files to sit directly at the top of the definition
 *    (immediately below `# <word>` and right above `> [!book]`).
 * 3. Strictly preserves all word definitions, callouts, and quotations untouched.
 */
import fs from 'node:fs';
import path from 'node:path';

const VAULT_ROOT = path.resolve(process.cwd(), '..', 'App database');
const PILLARS = ['English vocabulary master', 'Greek roots', 'Latin roots'];

function isWordFile(relPath, fileName) {
  if (!fileName.endsWith('.md')) return false;
  const base = fileName.slice(0, -3);
  if (base.startsWith('Dashboard —') || base.startsWith('Dashboard –') || base.startsWith('Dashboard -')) return false;
  if (base.startsWith('Cluster ') || base.startsWith('Word Triage')) return false;
  if (base.startsWith('00') || base.endsWith('Progress') || base.endsWith('roots') || base.endsWith('master')) return false;
  const parts = relPath.split('/');
  const parent = parts.length >= 2 ? parts[parts.length - 2] : '';
  if (base === parent) return false;
  if (relPath.includes('/01_') || relPath.includes('/02_') || relPath.includes('/03_') || relPath.includes('/04_')) return false;
  return true;
}

function walkDir(dir, relPrefix = '', out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = relPrefix ? `${relPrefix}/${e.name}` : e.name;
    if (e.isDirectory()) {
      walkDir(full, rel, out);
    } else if (isWordFile(rel, e.name)) {
      out.push({ full, rel });
    }
  }
  return out;
}

let totalScanned = 0;
let doubleFmFixed = 0;
let statusMovedToTop = 0;
let alreadyAtTop = 0;

for (const pillar of PILLARS) {
  const pDir = path.join(VAULT_ROOT, pillar);
  if (!fs.existsSync(pDir)) continue;
  const files = walkDir(pDir, pillar);

  for (const { full } of files) {
    totalScanned++;
    let raw = fs.readFileSync(full, 'utf8');
    let modified = false;

    // 1. Repair double frontmatter if present
    const cleanedBom = raw.replace(/\uFEFF/g, '');
    const doubleFmMatch = cleanedBom.match(/^---\r?\n([\s\S]*?)\r?\n---\s*\r?\n---\r?\n([\s\S]*?)\r?\n---/);
    if (doubleFmMatch) {
      const fm1 = doubleFmMatch[1].trim();
      const fm2 = doubleFmMatch[2].trim();
      const mergedLines = new Map();
      for (const line of [...fm2.split(/\r?\n/), ...fm1.split(/\r?\n/)]) {
        const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
        if (kv) mergedLines.set(kv[1], line.trim());
      }
      const mergedYaml = Array.from(mergedLines.values()).join('\n');
      raw = `---\n${mergedYaml}\n---` + cleanedBom.slice(doubleFmMatch[0].length);
      doubleFmFixed++;
      modified = true;
    }

    // 2. Check if `> [!status]` + `dataviewjs` is after `> [!book]`
    const bookIdx = raw.search(/^>\s*\[!book\]/m);
    const statusMatch = raw.match(/\n(>\s*\[!status\][^\n]*\r?\n+(?:```dataviewjs[\s\S]*?```))\s*$/);

    if (bookIdx !== -1 && statusMatch) {
      const statusIdx = statusMatch.index;
      if (statusIdx > bookIdx) {
        const statusBlock = statusMatch[1].trim();
        const withoutBottomStatus = raw.slice(0, statusIdx).trimEnd();
        const beforeBook = withoutBottomStatus.slice(0, bookIdx).trimEnd();
        const fromBook = withoutBottomStatus.slice(bookIdx);
        raw = `${beforeBook}\n\n${statusBlock}\n\n${fromBook}\n`;
        statusMovedToTop++;
        modified = true;
      } else {
        alreadyAtTop++;
      }
    } else if (bookIdx !== -1 && raw.indexOf('> [!status]') !== -1 && raw.indexOf('> [!status]') < bookIdx) {
      alreadyAtTop++;
    }

    if (modified) {
      fs.writeFileSync(full, raw, 'utf8');
    }
  }
}

console.log(JSON.stringify({
  totalScanned,
  doubleFmFixed,
  statusMovedToTop,
  alreadyAtTop
}, null, 2));
