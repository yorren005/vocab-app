import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const DIST_DIR = path.join(__dirname, 'dist');

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Refreshing Vault Index & Assets (excluding Content Studio)...');
execSync('node server.mjs --index-only', { cwd: __dirname, stdio: 'inherit' });

console.log('🏗️ Exporting static distribution to dist/...');
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
copyDirRecursive(PUBLIC_DIR, DIST_DIR);

console.log(`✅ Static build complete at: ${DIST_DIR}`);
console.log('   Deploy dist/ directly to Vercel, Netlify, Cloudflare Pages, or any static host.');
