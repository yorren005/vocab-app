import fs from 'fs';
import path from 'path';

const baseDir = 'App database/English vocabulary master';
const clusters = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name.startsWith('Cluster'))
  .map(d => d.name);

let totalWords = 0;
let problemWords = [];
let clusterStatus = {};

for (const c of clusters) {
  const cPath = path.join(baseDir, c);
  const files = fs.readdirSync(cPath).filter(f => f.endsWith('.md') && !f.startsWith('Cluster') && !f.startsWith('Semantic Field'));
  
  let clusterIssues = [];
  for (const f of files) {
    totalWords++;
    const content = fs.readFileSync(path.join(cPath, f), 'utf8');
    
    // Check primary meaning
    const pMatch = content.match(/1\.\s*\*\*Primary Meaning\*\*:\s*([^\r\n]+)/);
    const nMatch = content.match(/2\.\s*\*\*Nuance \/ Usage\*\*:\s*([^\r\n]+)/);
    
    let issues = [];
    if (!pMatch) issues.push('Missing Primary Meaning');
    if (!nMatch) issues.push('Missing Nuance / Usage');
    if (pMatch && nMatch && pMatch[1].trim().toLowerCase() === nMatch[1].trim().toLowerCase()) {
      issues.push('Duplicate Definition');
    }
    
    // Check quotes
    const quoteSection = content.split('> [!quote]')[1];
    let quoteCount = 0;
    let authors = [];
    if (quoteSection) {
      const qLines = quoteSection.split('\n').filter(l => l.trim().match(/^(?:>\s*)?-\s*📜/));
      quoteCount = qLines.length;
      for (const q of qLines) {
        const aMatch = q.match(/-\s*📜\s*\*\*([^*(:]+)/);
        if (aMatch) authors.push(aMatch[1].trim());
      }
    }
    if (quoteCount < 3) issues.push(`Only ${quoteCount} quotes`);
    const uniqueAuthors = new Set(authors);
    if (uniqueAuthors.size < quoteCount) issues.push(`Repeated author (${authors.join(', ')})`);

    if (issues.length > 0) {
      clusterIssues.push({ file: f, issues });
      problemWords.push({ cluster: c, file: f, issues });
    }
  }
  clusterStatus[c] = { total: files.length, issues: clusterIssues.length, details: clusterIssues };
}

console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Total clusters: ${clusters.length}`);
console.log(`Total words: ${totalWords}`);
console.log(`Total problem words: ${problemWords.length}`);

const problematicClusters = Object.entries(clusterStatus).filter(([c, info]) => info.issues > 0);
console.log(`Problematic clusters count: ${problematicClusters.length}`);
for (const [c, info] of problematicClusters) {
  console.log(`- ${c}: ${info.issues} issues / ${info.total} words`);
}

