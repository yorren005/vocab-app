import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || 'App database/Greek roots/Cluster Power, Strength & Dominion';

function walk(dir) {
  let res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      res.push(...walk(full));
    } else if (
      ent.name.endsWith('.md') &&
      !ent.name.startsWith('Dashboard —') &&
      !ent.name.startsWith('Word Triage —') &&
      !ent.name.startsWith('Cluster') &&
      !ent.name.startsWith('Semantic Field')
    ) {
      res.push(full);
    }
  }
  return res;
}

const files = walk(targetDir);
console.log(`Auditing ${files.length} word notes in: ${targetDir}\n`);

let problemCount = 0;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const word = fileName.replace('.md', '').toLowerCase();
  
  let issues = [];

  // 1. Status toggle position
  const statusPos = content.indexOf('> [!status]');
  const bookPos = content.indexOf('> [!book]');
  if (statusPos === -1) issues.push('Missing [!status] block');
  if (bookPos === -1) issues.push('Missing [!book] block');
  if (statusPos !== -1 && bookPos !== -1 && statusPos > bookPos) {
    issues.push('Status block is below [!book]');
  }

  // 2. Definitions
  const pMatch = content.match(/1\.\s*\*\*([^*]+)\*\*:\s*([^\r\n]+)/);
  const sMatch = content.match(/2\.\s*\*\*([^*]+)\*\*:\s*([^\r\n]+)/);
  if (!pMatch) issues.push('Missing Primary Definition');
  if (!sMatch) issues.push('Missing Secondary Definition');
  if (pMatch && sMatch) {
    const pText = pMatch[2].trim().toLowerCase();
    const sText = sMatch[2].trim().toLowerCase();
    if (pText === sText) issues.push('Duplicate Definition (Primary == Secondary)');
  }

  // 3. Quotes
  const quoteSection = content.split('> [!quote]')[1];
  if (!quoteSection) {
    issues.push('Missing [!quote] section');
  } else {
    const lines = quoteSection.split('\n').filter(l => l.trim().match(/^(?:>\s*)?-\s*📜/));
    if (lines.length < 3) {
      issues.push(`Only ${lines.length} quotes (minimum 3 required)`);
    }
    
    let authors = [];
    let hasPlaceholder = false;
    let boldTargetFound = 0;

    for (const line of lines) {
      if (line.includes('Academic Lexicon')) hasPlaceholder = true;
      const authMatch = line.match(/-\s*📜\s*\*\*([^*(:]+)/);
      if (authMatch) {
        authors.push(authMatch[1].trim());
      }
      if (line.includes('**')) {
        // Check if word or stem is bolded
        boldTargetFound++;
      }
    }

    if (hasPlaceholder) issues.push('Contains placeholder author (Academic Lexicon)');
    const uniqueAuthors = new Set(authors);
    if (uniqueAuthors.size < lines.length) {
      issues.push(`Duplicate author in quotes (${authors.join(', ')})`);
    }
  }

  if (issues.length > 0) {
    problemCount++;
    console.log(`❌ ${path.relative(targetDir, filePath)}:`);
    issues.forEach(i => console.log(`   - ${i}`));
  }
}

console.log(`\n========================================`);
console.log(`Total words audited: ${files.length}`);
console.log(`Problem words: ${problemCount}`);
console.log(`Pristine words: ${files.length - problemCount}`);
console.log(`========================================`);
