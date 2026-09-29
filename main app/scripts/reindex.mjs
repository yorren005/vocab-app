/**
 * CLI Tool to Re-index the App Database
 * Usage:
 *   node scripts/reindex.mjs
 * Triggers instant re-indexing via running server API, or falls back to server.mjs --index-only.
 */

import http from 'node:http';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_DIR = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 3080);

function triggerServerReindex() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/api/reindex',
        method: 'POST',
        timeout: 4000
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({ ok: true, raw: data });
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.end();
  });
}

async function main() {
  console.log('⚡ Requesting database re-index...');
  try {
    const res = await triggerServerReindex();
    console.log(`✅ Live server re-indexed successfully! Total notes: ${res.totalNotes?.toLocaleString()}`);
  } catch {
    console.log('ℹ️  Server not responding on port 3080. Performing direct local index build...');
    execSync('node server.mjs --index-only', { cwd: APP_DIR, stdio: 'inherit' });
    console.log('✅ Direct index build complete!');
  }
}

main();
