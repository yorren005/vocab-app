import fs from 'fs';
import path from 'path';

const roots = ['Greek roots', 'Latin roots', 'English vocabulary master'];
const vault = 'D:\\Language';

for (const r of roots) {
  let count = 0;
  let size = 0;
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, f.name);
      if (f.isDirectory()) {
        walk(full);
      } else if (f.isFile() && f.name.endsWith('.md')) {
        count++;
        size += fs.statSync(full).size;
      }
    }
  }
  walk(path.join(vault, r));
  console.log(r + ': ' + count + ' notes, ' + (size / 1024 / 1024).toFixed(2) + ' MB');
}
