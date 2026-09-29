import fs from 'node:fs';

const t0 = Date.now();
let count = 0;
let dashTables = 0;
let dashRows = 0;

function scanDashboards(dir) {
  try {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isDirectory() && f.name.startsWith('Cluster')) {
        const cPath = dir + '/' + f.name;
        for (const f2 of fs.readdirSync(cPath, { withFileTypes: true })) {
          if (f2.isDirectory() && f2.name.startsWith('Dashboard —')) {
            const dFile = `${cPath}/${f2.name}/${f2.name}.md`;
            if (fs.existsSync(dFile)) {
              dashTables++;
              const content = fs.readFileSync(dFile, 'utf8');
              const lines = content.split('\n');
              for (const l of lines) {
                if (l.startsWith('| [[') && l.includes('|')) {
                  dashRows++;
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {}
}

scanDashboards('D:/Language/Latin roots');
scanDashboards('D:/Language/Greek roots');

console.log(`Scanned ${dashTables} root dashboards with ${dashRows} exhaustive table rows in ${Date.now() - t0}ms!`);
