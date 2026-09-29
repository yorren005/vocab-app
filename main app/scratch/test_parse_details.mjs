import fs from 'node:fs';

function cleanDefinition(raw) {
  if (!raw) return '';
  return raw
    .replace(/\[\[|\]\]/g, '')
    .replace(/;\s*;\s*-\s*[a-zA-Z\s.-]+$/g, '')
    .replace(/;\s*-\s*[a-zA-Z\s.-]+$/g, '')
    .trim();
}

export function extractCardDetails(rawContent) {
  let primaryDef = '';
  let secondaryDef = '';
  const quotes = [];

  const lines = rawContent.split(/\r?\n/);
  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/>\s*\[!(?:book|definition|summary|note|lexicon|meaning)[^\]]*\]/i)) {
      currentSection = 'def';
      continue;
    } else if (line.match(/>\s*\[!(?:quote|cite|example|citation)[^\]]*\]/i)) {
      currentSection = 'quote';
      continue;
    } else if (line.match(/>\s*\[!/i) || (!line.startsWith('>') && line.trim().startsWith('#'))) {
      currentSection = null;
    }

    if (currentSection === 'def') {
      const clean = line.replace(/^>\s*/, '').trim();
      if (!clean) continue;

      const pMatch = clean.match(/(?:1\.\s*)?\*\*(?:Primary|Concise)[^*]*\*\*:\s*(.*)/i);
      if (pMatch && !primaryDef) {
        primaryDef = cleanDefinition(pMatch[1]);
      }

      const sMatch = clean.match(/(?:2\.\s*)?\*\*(?:Secondary|Nuanced|Nuance)[^*]*\*\*:\s*(.*)/i);
      if (sMatch && !secondaryDef) {
        secondaryDef = cleanDefinition(sMatch[1]);
      }

      if (!primaryDef && clean.startsWith('1.')) {
        primaryDef = cleanDefinition(clean.replace(/^1\.\s*/, '').replace(/\*\*[^*]+\*\*:\s*/, ''));
      }
    } else if (currentSection === 'quote') {
      const clean = line.replace(/^>\s*-\s*📜?\s*/, '').replace(/^>\s*/, '').trim();
      if (!clean) continue;

      const m = clean.match(/^\*\*([^*]+?)(?:\s*\(([^)]+)\))?:?\*\*:?\s*\*?["“]([^"”]+)["”]\*?/);
      if (m) {
        const author = (m[1] || '').replace(/[:*]/g, '').trim();
        const work = (m[2] || '').replace(/[:*]/g, '').trim();
        quotes.push({ author, work, quote: m[3].trim() });
      } else {
        const qm = clean.match(/["“]([^"”]+)["”]/);
        if (qm) {
          quotes.push({ author: '', work: '', quote: qm[1].trim() });
        }
      }
    }
  }

  // Fallbacks if no callout was present
  if (!primaryDef) {
    const lineMatch = rawContent.match(/\*\*Definition:\*\*\s*([^\n]+)/i) || rawContent.match(/#+\s*Definition\s*\n+([^\n#]+)/i);
    if (lineMatch) primaryDef = cleanDefinition(lineMatch[1]);
  }

  return { primaryDef, secondaryDef, quotes };
}

// Test against 3 Latin, 3 Greek, and 1 Vocab Master
const testFiles = [
  'D:/Language/Latin roots/Cluster Asking & Seeking/Dashboard — pet/appetite.md',
  'D:/Language/Latin roots/Cluster Action/Dashboard — act/abactinal.md',
  'D:/Language/Greek roots/Cluster Action/Dashboard — actin/actin.md',
  'D:/Language/English vocabulary master/Cluster Beauty and Ugliness/bonny.md'
];

testFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const res = extractCardDetails(fs.readFileSync(f, 'utf8'));
    console.log(`\n=== ${f.split('/').pop()} ===`);
    console.log(`Primary Def:`, res.primaryDef);
    console.log(`Secondary Def:`, res.secondaryDef || '(none)');
    console.log(`Quotes (${res.quotes.length}):`, res.quotes.slice(0, 2));
  }
});
