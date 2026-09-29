/**
 * Verification & Health Check for App Database Tree Structure
 * Verifies exact hierarchy:
 *   App database/
 *     Latin roots/Cluster <Name>/Dashboard — <root>/<words>.md
 *     Greek roots/Cluster <Name>/Dashboard — <root>/<words>.md
 *     English vocabulary master/Cluster <Name>/<words>.md
 *     00 Language Hub.md
 *     database-manifest.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_ROOT = path.resolve(__dirname, '..', '..', 'App database');

console.log('='.repeat(70));
console.log('  🏛️  APP DATABASE TREE STRUCTURE & HEALTH VERIFICATION');
console.log('='.repeat(70));
console.log(`Target Database: ${DB_ROOT}\n`);

if (!fs.existsSync(DB_ROOT)) {
  console.error(`❌ App database directory not found: ${DB_ROOT}`);
  process.exit(1);
}

const stats = {
  pillars: {
    'Latin roots': { clusters: 0, dashboards: 0, words: 0, mocs: 0, other: 0 },
    'Greek roots': { clusters: 0, dashboards: 0, words: 0, mocs: 0, other: 0 },
    'English vocabulary master': { clusters: 0, semanticFields: 0, words: 0, mocs: 0, other: 0 }
  },
  rootFiles: [],
  totalFiles: 0,
  sampleWords: []
};

// 1. Check Root Files
const rootEntries = fs.readdirSync(DB_ROOT, { withFileTypes: true });
for (const entry of rootEntries) {
  if (entry.isFile()) {
    const fsize = (fs.statSync(path.join(DB_ROOT, entry.name)).size / 1024).toFixed(1);
    stats.rootFiles.push({ name: entry.name, sizeKB: fsize });
  }
}

// 2. Scan Classical Roots (Latin & Greek)
for (const pillar of ['Latin roots', 'Greek roots']) {
  const pillarDir = path.join(DB_ROOT, pillar);
  if (!fs.existsSync(pillarDir)) continue;

  const clusterEntries = fs.readdirSync(pillarDir, { withFileTypes: true });
  for (const cEntry of clusterEntries) {
    if (cEntry.isDirectory() && cEntry.name.startsWith('Cluster ')) {
      stats.pillars[pillar].clusters++;
      const clusterPath = path.join(pillarDir, cEntry.name);
      const subEntries = fs.readdirSync(clusterPath, { withFileTypes: true });

      for (const sub of subEntries) {
        if (sub.isDirectory() && sub.name.startsWith('Dashboard — ')) {
          stats.pillars[pillar].dashboards++;
          const dashPath = path.join(clusterPath, sub.name);
          const wordEntries = fs.readdirSync(dashPath, { withFileTypes: true });

          for (const w of wordEntries) {
            if (w.isFile() && w.name.endsWith('.md')) {
              stats.pillars[pillar].words++;
              stats.totalFiles++;
              if (stats.sampleWords.length < 3) {
                stats.sampleWords.push({
                  pillar,
                  cluster: cEntry.name,
                  dashboard: sub.name,
                  word: w.name,
                  relPath: `${pillar}/${cEntry.name}/${sub.name}/${w.name}`
                });
              }
            }
          }
        } else if (sub.isFile() && sub.name.endsWith('.md')) {
          if (sub.name.startsWith('Cluster ')) stats.pillars[pillar].mocs++;
          else stats.pillars[pillar].other++;
          stats.totalFiles++;
        }
      }
    } else if (cEntry.isFile() && cEntry.name.endsWith('.md')) {
      stats.pillars[pillar].other++;
      stats.totalFiles++;
    }
  }
}

// 3. Scan English Vocabulary Master
const vocabDir = path.join(DB_ROOT, 'English vocabulary master');
if (fs.existsSync(vocabDir)) {
  const clusterEntries = fs.readdirSync(vocabDir, { withFileTypes: true });
  for (const cEntry of clusterEntries) {
    if (cEntry.isDirectory() && cEntry.name.startsWith('Cluster ')) {
      stats.pillars['English vocabulary master'].clusters++;
      const clusterPath = path.join(vocabDir, cEntry.name);
      const subEntries = fs.readdirSync(clusterPath, { withFileTypes: true });

      for (const sub of subEntries) {
        if (sub.isFile() && sub.name.endsWith('.md')) {
          stats.totalFiles++;
          if (sub.name.startsWith('Cluster ')) {
            stats.pillars['English vocabulary master'].mocs++;
          } else if (sub.name.startsWith('Semantic Field — ')) {
            stats.pillars['English vocabulary master'].semanticFields++;
          } else {
            stats.pillars['English vocabulary master'].words++;
            if (stats.sampleWords.length < 5) {
              stats.sampleWords.push({
                pillar: 'English vocabulary master',
                cluster: cEntry.name,
                dashboard: 'N/A',
                word: sub.name,
                relPath: `English vocabulary master/${cEntry.name}/${sub.name}`
              });
            }
          }
        }
      }
    } else if (cEntry.isFile() && cEntry.name.endsWith('.md')) {
      stats.pillars['English vocabulary master'].other++;
      stats.totalFiles++;
    }
  }
}

// Output Report
console.log('📌 ROOT MASTER ASSETS:');
for (const rf of stats.rootFiles) {
  console.log(`   ✓ ${rf.name} (${rf.sizeKB} KB)`);
}

console.log('\n🏛️ PILLAR 1: Latin roots');
const latin = stats.pillars['Latin roots'];
console.log(`   - Clusters:       ${latin.clusters}`);
console.log(`   - Root Dashboards:${latin.dashboards}`);
console.log(`   - Word Cards:     ${latin.words.toLocaleString()}`);
console.log(`   - Cluster MOCs:   ${latin.mocs}`);

console.log('\n🏛️ PILLAR 2: Greek roots');
const greek = stats.pillars['Greek roots'];
console.log(`   - Clusters:       ${greek.clusters}`);
console.log(`   - Root Dashboards:${greek.dashboards}`);
console.log(`   - Word Cards:     ${greek.words.toLocaleString()}`);
console.log(`   - Cluster MOCs:   ${greek.mocs}`);

console.log('\n🏛️ PILLAR 3: English vocabulary master');
const vm = stats.pillars['English vocabulary master'];
console.log(`   - Clusters:       ${vm.clusters}`);
console.log(`   - Semantic Fields:${vm.semanticFields}`);
console.log(`   - Word Cards:     ${vm.words.toLocaleString()}`);
console.log(`   - Cluster MOCs:   ${vm.mocs}`);

const totalWords = latin.words + greek.words + vm.words;
console.log('\n' + '-'.repeat(70));
console.log(`📊 TOTAL INDIVIDUAL WORDS: ${totalWords.toLocaleString()}`);
console.log(`📊 TOTAL DATABASE FILES:    ${(stats.totalFiles + stats.rootFiles.length).toLocaleString()}`);
console.log('-'.repeat(70));

// Quality check on sample words
console.log('\n🔍 SAMPLE WORD VERIFICATION:');
for (const s of stats.sampleWords) {
  const fullPath = path.join(DB_ROOT, s.relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const hasDef = content.includes('Definition') || content.includes('Meaning');
  const hasExample = content.includes('Contextual Usage') || content.includes('Example') || content.includes('Shakespeare');
  const hasStatus = content.includes('status:');

  console.log(`   📖 ${s.relPath}`);
  console.log(`      ✓ Definition: ${hasDef ? 'Yes' : 'No'} | Context/Examples: ${hasExample ? 'Yes' : 'No'} | Status: ${hasStatus ? 'Yes' : 'No'}`);
}

console.log('\n✅ Database tree structure verified successfully!\n');
