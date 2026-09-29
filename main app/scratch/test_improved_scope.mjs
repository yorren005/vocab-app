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

function getWordsForScope(scopePath) {
  if (!scopePath || allWordCards.length === 0) return [];
  const parts = scopePath.split('/');
  const fileName = parts[parts.length - 1];
  const isDash = fileName.startsWith('Dashboard —');
  const isCluster = fileName.startsWith('Cluster ') || parts.some(p => p.startsWith('Cluster '));
  const isVocabSection = scopePath.startsWith('English vocabulary master') && (
    fileName === 'English vocabulary master.md' ||
    fileName === '000_Vocabulary_Master_MOC.md' ||
    fileName === 'Vocabulary Learning Progress.md' ||
    parts.length <= 2
  );
  const isGreekSection = scopePath.startsWith('Greek roots') && (
    fileName === 'Greek roots.md' ||
    fileName === 'Dashboard — Greek Roots.md' ||
    fileName === 'Master Table — Greek Roots.md'
  );
  const isLatinSection = scopePath.startsWith('Latin roots') && (
    fileName === 'Latin roots.md' ||
    fileName === 'Dashboard — Latin Roots.md' ||
    fileName === 'Master Table — Latin Roots.md'
  );

  // 1. Full Discipline Section Scope (Tab 1 Master Section opened)
  if (isVocabSection) {
    return allWordCards.filter(c => c.category === 'vocab');
  }
  if (isGreekSection) {
    return allWordCards.filter(c => c.category === 'greek');
  }
  if (isLatinSection) {
    return allWordCards.filter(c => c.category === 'latin');
  }

  // 2. Classical Root Dashboard (Latin / Greek individual root)
  if (isDash && !fileName.includes('Roots')) {
    const folder = parts.slice(0, -1).join('/');
    const dashName = fileName.replace(/\.md$/, '').trim();
    const rootName = dashName.replace(/^Dashboard\s+—\s+/, '').trim();

    return allWordCards.filter(c => {
      if (c.path === scopePath) return false;
      if (folder && c.path.startsWith(folder + '/')) {
        const fn = c.path.split('/').pop();
        if (!fn.startsWith('Dashboard') && !fn.startsWith('Cluster') && !fn.startsWith('Word Triage')) return true;
      }
      const p = c.rawPage;
      if (p) {
        if (p.lr && (p.lr === `[[${rootName}]]` || p.lr === `[[${dashName}]]` || p.lr === `[[Dashboard — ${rootName}]]`)) return true;
        if (p.gr && (p.gr === `[[${rootName}]]` || p.gr === `[[${dashName}]]` || p.gr === `[[Dashboard — ${rootName}]]`)) return true;
      }
      return false;
    });
  }

  // 3. Cluster Scope (either Cluster Dashboard or Semantic Field inside a cluster)
  if (isCluster) {
    const clusterFolderIndex = parts.findIndex(p => p.startsWith('Cluster '));
    const clusterFolderPart = clusterFolderIndex !== -1 ? parts[clusterFolderIndex] : '';
    const clusterName = clusterFolderPart ? clusterFolderPart.trim() : fileName.replace(/\.md$/, '').trim();
    const clusterFolder = clusterFolderIndex !== -1 ? parts.slice(0, clusterFolderIndex + 1).join('/') : parts.slice(0, -1).join('/');

    return allWordCards.filter(c => {
      if (c.path === scopePath) return false;
      if (clusterFolder && c.path.startsWith(clusterFolder + '/')) {
        const fn = c.path.split('/').pop();
        if (!fn.startsWith('Cluster') && !fn.startsWith('Semantic Field') && !fn.startsWith('Dashboard')) return true;
      }
      if (c.cluster === clusterName || (c.rawPage && c.rawPage.c && (c.rawPage.c === clusterName || c.rawPage.c === `[[${clusterName}]]`))) return true;
      return false;
    });
  }

  return [];
}

console.log('Vocab Master Section MOC words:', getWordsForScope('English vocabulary master/English vocabulary master.md').length);
console.log('000_Vocabulary_Master_MOC.md words:', getWordsForScope('English vocabulary master/000_Vocabulary_Master_MOC.md').length);
console.log('Cluster Beauty and Ugliness.md words:', getWordsForScope('English vocabulary master/Cluster Beauty and Ugliness/Cluster Beauty and Ugliness.md').length);
console.log('Semantic Field — Patina words:', getWordsForScope('English vocabulary master/Cluster Beauty and Ugliness/Semantic Field — Patina, Grace and Squalor.md').length);
console.log('Cluster Earth and Stone.md words:', getWordsForScope('English vocabulary master/Cluster Earth and Stone/Cluster Earth and Stone.md').length);
console.log('Semantic Field — Earth words:', getWordsForScope('English vocabulary master/Cluster Earth and Stone/Semantic Field — Earth, Rock and Terrain.md').length);
