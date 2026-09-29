import fs from 'node:fs';

const index = JSON.parse(fs.readFileSync('public/data/vault-index.json', 'utf8'));

export function getWordsForScope(scopePath) {
  const parts = scopePath.split('/');
  const isDash = parts[parts.length - 1].startsWith('Dashboard —');
  const isCluster = parts[parts.length - 1].startsWith('Cluster ');

  if (isDash) {
    const folder = parts.slice(0, -1).join('/');
    const dashName = parts[parts.length - 1].replace(/\.md$/, '');
    const rootName = dashName.replace(/^Dashboard\s+—\s+/, '').trim();

    return index.pages.filter(p => {
      if (p.p === scopePath) return false;
      // In dashboard folder
      if (folder && p.p.startsWith(folder + '/')) {
        const fn = p.p.split('/').pop();
        if (!fn.startsWith('Dashboard') && !fn.startsWith('Cluster') && !fn.startsWith('Word Triage')) return true;
      }
      // Exact root link match
      if (p.lr && (p.lr === `[[${rootName}]]` || p.lr === `[[${dashName}]]` || p.lr === `[[Dashboard — ${rootName}]]`)) return true;
      if (p.gr && (p.gr === `[[${rootName}]]` || p.gr === `[[${dashName}]]` || p.gr === `[[Dashboard — ${rootName}]]`)) return true;
      return false;
    });
  } else if (isCluster) {
    const clusterName = parts[parts.length - 1].replace(/\.md$/, '').trim();
    const clusterFolder = parts.slice(0, -1).join('/') || parts[0];

    return index.pages.filter(p => {
      if (p.p === scopePath) return false;
      if (p.p.startsWith(clusterFolder + '/')) {
        const fn = p.p.split('/').pop();
        if (!fn.startsWith('Cluster') && !fn.startsWith('Semantic Field') && !fn.startsWith('Dashboard')) return true;
      }
      if (p.c && (p.c === `[[${clusterName}]]` || p.c === clusterName)) return true;
      return false;
    });
  }

  return [];
}

const petWords = getWordsForScope('Latin roots/Cluster Asking & Seeking/Dashboard — pet/Dashboard — pet.md');
console.log('Words strictly for Dashboard — pet:', petWords.length);
console.log('First 6:', petWords.slice(0, 6).map(w => w.p.split('/').pop()));

const actWords = getWordsForScope('Latin roots/Cluster Action/Dashboard — act/Dashboard — act.md');
console.log('Words strictly for Dashboard — act:', actWords.length);

const beautyWords = getWordsForScope('English vocabulary master/Cluster Beauty and Ugliness/Cluster Beauty and Ugliness.md');
console.log('Words strictly for Cluster Beauty and Ugliness:', beautyWords.length);
console.log('Beauty sample:', beautyWords.map(w => w.p.split('/').pop()));
