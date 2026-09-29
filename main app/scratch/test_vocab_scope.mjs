import fs from 'fs';
const index = JSON.parse(fs.readFileSync('public/data/vault-index.json', 'utf8'));

function isStudyPage(notePath) {
  if (!notePath || !notePath.endsWith('.md')) return false;
  if (notePath.includes('_assets') || notePath.includes('Templates')) return false;
  if (notePath === '00 Language Hub.md') return true;

  const baseName = notePath.slice(notePath.lastIndexOf('/') + 1).replace(/\.md$/i, '');
  const lowerBase = baseName.toLowerCase();

  if (baseName.startsWith('Dashboard —') || baseName.startsWith('Master Table') || baseName.startsWith('Word Triage')) return true;
  if (baseName.endsWith('Progress') || baseName.endsWith('MOC') || baseName.endsWith('Dashboards')) return true;
  if (baseName.startsWith('Semantic Field —') || baseName.startsWith('Concept —') || baseName.startsWith('Overview —') || baseName.startsWith('Table —')) return true;
  if (baseName.startsWith('00_') || baseName.startsWith('01_') || baseName.startsWith('02_') || baseName.startsWith('03_')) return true;
  if (notePath.includes('03_Reference_and_Rules') || notePath.includes('01_Root_Dashboards')) return true;

  if (lowerBase.startsWith('prefix') || lowerBase.startsWith('suffix')) return true;
  if (baseName.includes('Rules') || baseName.includes('Atlas') || baseName.includes('Method') || baseName.includes('Formula')) return true;

  const dirParts = notePath.split('/');
  if (dirParts.length >= 2 && dirParts[dirParts.length - 2] === baseName) return true;
  if (baseName.startsWith('Cluster ') && baseName === dirParts[dirParts.length - 1].replace(/\.md$/i, '')) return true;

  return false;
}

function isWordCard(notePath) {
  if (!notePath || !notePath.endsWith('.md')) return false;
  if (!notePath.startsWith('Greek roots/') && !notePath.startsWith('Latin roots/') && !notePath.startsWith('English vocabulary master/')) {
    return false;
  }
  return !isStudyPage(notePath);
}

function getCategoryFromPath(path) {
  if (path.startsWith('Greek roots')) return 'greek';
  if (path.startsWith('Latin roots')) return 'latin';
  if (path.startsWith('English vocabulary master')) return 'vocab';
  return 'other';
}

function getClusterFromPath(path) {
  const parts = path.split('/');
  for (const part of parts) {
    if (part.startsWith('Cluster ') || part.startsWith('Dashboard — ')) {
      return part.replace(/^Cluster\s+/, '').replace(/^Dashboard\s+—\s+/, '');
    }
  }
  return parts[1] || '';
}

const pages = index.pages.filter(p =>
  p.p.startsWith('Greek roots/') ||
  p.p.startsWith('Latin roots/') ||
  p.p.startsWith('English vocabulary master/') ||
  p.p === '00 Language Hub.md'
);

const allWordCards = [];
for (const p of pages) {
  if (isWordCard(p.p)) {
    allWordCards.push({
      path: p.p,
      name: p.p.slice(p.p.lastIndexOf('/') + 1).replace(/\.md$/i, ''),
      category: getCategoryFromPath(p.p),
      cluster: getClusterFromPath(p.p),
      rawPage: p
    });
  }
}

console.log('allWordCards total:', allWordCards.length);
const vocabCards = allWordCards.filter(c => c.category === 'vocab');
console.log('allWordCards vocab count:', vocabCards.length);

function getWordsForScope(scopePath) {
  if (!scopePath || allWordCards.length === 0) return [];
  const parts = scopePath.split('/');
  const fileName = parts[parts.length - 1];
  const isDash = fileName.startsWith('Dashboard —');
  const isCluster = fileName.startsWith('Cluster ');

  if (isDash) {
    const folder = parts.slice(0, -1).join('/');
    return allWordCards.filter(c => {
      if (c.path === scopePath) return false;
      if (folder && c.path.startsWith(folder + '/')) {
        const fn = c.path.split('/').pop();
        if (!fn.startsWith('Dashboard') && !fn.startsWith('Cluster') && !fn.startsWith('Word Triage')) return true;
      }
      return false;
    });
  } else if (isCluster) {
    const clusterName = fileName.replace(/\.md$/, '').trim();
    const clusterFolder = parts.slice(0, -1).join('/') || parts[0];
    return allWordCards.filter(c => {
      if (c.path === scopePath) return false;
      if (c.path.startsWith(clusterFolder + '/')) {
        const fn = c.path.split('/').pop();
        if (!fn.startsWith('Cluster') && !fn.startsWith('Semantic Field') && !fn.startsWith('Dashboard')) return true;
      }
      if (c.cluster === clusterName) return true;
      return false;
    });
  }
  return [];
}

console.log('Scope for English vocabulary master.md:', getWordsForScope('English vocabulary master/English vocabulary master.md').length);
console.log('Scope for 000_Vocabulary_Master_MOC.md:', getWordsForScope('English vocabulary master/000_Vocabulary_Master_MOC.md').length);
console.log('Scope for Cluster Beauty and Ugliness.md:', getWordsForScope('English vocabulary master/Cluster Beauty and Ugliness/Cluster Beauty and Ugliness.md').length);

console.log('Sample vocab words:', vocabCards.slice(0, 5).map(c => c.name));
