import fs from 'fs';
import path from 'path';

const base = 'App database/Greek roots';
const clusters = fs.readdirSync(base, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name.startsWith('Cluster'))
  .map(d => d.name);

function countWords(dir) {
  let count = 0;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) count += countWords(full);
    else if (
      f.name.endsWith('.md') &&
      !f.name.startsWith('Dashboard —') &&
      !f.name.startsWith('Word Triage —') &&
      !f.name.startsWith('Cluster') &&
      !f.name.startsWith('Semantic Field')
    ) {
      count++;
    }
  }
  return count;
}

const list = clusters.map(c => ({ name: c, count: countWords(path.join(base, c)) }))
  .sort((a, b) => a.count - b.count);

console.log('Greek Roots Clusters sorted by word count:');
let total = 0;
for (const c of list) {
  console.log(`  - ${c.name}: ${c.count} words`);
  total += c.count;
}
console.log(`\nTotal Greek root words: ${total}`);
