import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const SOURCE_VAULT = process.env.SOURCE_VAULT || 'D:\\Language';
const TARGET_APP_DB = process.env.TARGET_APP_DB || path.resolve(__dirname, '..', '..', 'App database');

// Allowed pure vocabulary sections
const ALLOWED_SECTIONS = [
  'Greek roots',
  'Latin roots',
  'English vocabulary master'
];

const ROOT_FILES = [
  '00 Language Hub.md'
];

// Folders/files to exclude from inside sections
const EXCLUDE_NAMES = new Set([
  '.git',
  '.obsidian',
  '.gemini',
  'scripts',
  'logs',
  'analysis',
  '_archive',
  '_assets',
  'Templates',
  'Content Studio',
  'Untitled.md',
  'Kernel Expansion.md'
]);

async function copyFileIfChanged(src, dest) {
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  const srcStat = await fsp.stat(src);
  let shouldCopy = true;
  if (fs.existsSync(dest)) {
    const destStat = await fsp.stat(dest);
    if (srcStat.size === destStat.size && Math.abs(srcStat.mtimeMs - destStat.mtimeMs) < 1000) {
      shouldCopy = false;
    }
  }
  if (shouldCopy) {
    await fsp.copyFile(src, dest);
  }
  return { copied: shouldCopy, size: srcStat.size };
}

async function syncDirectoryTree(srcDir, destDir) {
  let notesCount = 0;
  let bytesCount = 0;
  let copiedCount = 0;
  const clusterMap = {};

  async function walk(currentSrc, currentDest, relPath = '') {
    let entries;
    try {
      entries = await fsp.readdir(currentSrc, { withFileTypes: true });
    } catch (e) {
      console.warn(`Cannot read ${currentSrc}:`, e.message);
      return;
    }

    for (const entry of entries) {
      const name = entry.name;
      if (EXCLUDE_NAMES.has(name) || name.startsWith('.')) continue;

      const srcEntryPath = path.join(currentSrc, name);
      const destEntryPath = path.join(currentDest, name);
      const relEntryPath = relPath ? `${relPath}/${name}` : name;

      if (entry.isDirectory()) {
        await walk(srcEntryPath, destEntryPath, relEntryPath);
      } else if (entry.isFile()) {
        if (name.endsWith('.md')) {
          const res = await copyFileIfChanged(srcEntryPath, destEntryPath);
          notesCount++;
          bytesCount += res.size;
          if (res.copied) copiedCount++;

          // Track cluster mapping
          const parts = relEntryPath.split('/');
          const section = parts[0];
          const clusterPart = parts.find(p => p.startsWith('Cluster '));
          if (clusterPart) {
            if (!clusterMap[section]) clusterMap[section] = {};
            clusterMap[section][clusterPart] = (clusterMap[section][clusterPart] || 0) + 1;
          }
        }
      }
    }
  }

  await walk(srcDir, destDir);
  return { notesCount, bytesCount, copiedCount, clusterMap };
}

async function main() {
  console.log('🏛️  Starting Pure Vocabulary Database Migration & Optimization...');
  console.log(`   ➜ Source Vault:    ${SOURCE_VAULT}`);
  console.log(`   ➜ Target Database: ${TARGET_APP_DB}\n`);

  if (!fs.existsSync(SOURCE_VAULT)) {
    console.error(`❌ Source vault not found at: ${SOURCE_VAULT}`);
    process.exit(1);
  }

  await fsp.mkdir(TARGET_APP_DB, { recursive: true });

  const startTime = Date.now();
  let totalNotes = 0;
  let totalBytes = 0;
  let totalCopied = 0;
  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceVault: SOURCE_VAULT,
    sections: {}
  };

  // 1. Copy Master Root Files (e.g. 00 Language Hub.md)
  for (const rf of ROOT_FILES) {
    const srcFile = path.join(SOURCE_VAULT, rf);
    const destFile = path.join(TARGET_APP_DB, rf);
    if (fs.existsSync(srcFile)) {
      const res = await copyFileIfChanged(srcFile, destFile);
      totalNotes++;
      totalBytes += res.size;
      if (res.copied) totalCopied++;
      console.log(`📄 Synced Hub Portal: ${rf} (${(res.size / 1024).toFixed(1)} KB)`);
    }
  }

  // 2. Copy Each Pure Vocabulary Section Tree
  for (const sec of ALLOWED_SECTIONS) {
    const secSrc = path.join(SOURCE_VAULT, sec);
    const secDest = path.join(TARGET_APP_DB, sec);

    if (!fs.existsSync(secSrc)) {
      console.warn(`⚠️ Section directory not found: ${secSrc}`);
      continue;
    }

    console.log(`📂 Syncing Section: [${sec}]...`);
    const secResult = await syncDirectoryTree(secSrc, secDest);
    totalNotes += secResult.notesCount;
    totalBytes += secResult.bytesCount;
    totalCopied += secResult.copiedCount;

    manifest.sections[sec] = {
      notesCount: secResult.notesCount,
      bytesCount: secResult.bytesCount,
      mb: (secResult.bytesCount / 1024 / 1024).toFixed(2),
      clusterCount: Object.keys(secResult.clusterMap[sec] || {}).length,
      clusters: secResult.clusterMap[sec] || {}
    };

    console.log(`   ✅ [${sec}]: ${secResult.notesCount.toLocaleString()} notes (${(secResult.bytesCount / 1024 / 1024).toFixed(2)} MB, ${manifest.sections[sec].clusterCount} clusters)`);
  }

  manifest.totalNotes = totalNotes;
  manifest.totalBytes = totalBytes;
  manifest.totalMb = (totalBytes / 1024 / 1024).toFixed(2);

  // 3. Write Database Manifest into App database
  const manifestPath = path.join(TARGET_APP_DB, 'database-manifest.json');
  await fsp.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n📋 Database manifest written to: ${manifestPath}`);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n🎉 DATABASE SYNC COMPLETE in ${duration}s!`);
  console.log(`   ➜ Total Notes:    ${totalNotes.toLocaleString()}`);
  console.log(`   ➜ Total Size:     ${manifest.totalMb} MB`);
  console.log(`   ➜ Files Copied:   ${totalCopied.toLocaleString()}`);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
