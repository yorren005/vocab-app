import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { gitSync } from './git-sync.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_APP_DB = path.resolve(__dirname, '..', 'App database');
const VAULT_ROOT = process.env.VAULT_PATH || (fs.existsSync(DEFAULT_APP_DB) ? DEFAULT_APP_DB : 'D:\\Language');
const PORT = Number(process.env.PORT || 3080);
const AUTH_TOKEN = (process.env.AUTH_TOKEN || process.env.VAULT_PASSWORD || '').trim();
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const STYLES_DIR = path.join(PUBLIC_DIR, 'styles');
const BANNERS_DIR = path.join(PUBLIC_DIR, 'assets', 'banners');
const STATUS_DB_PATH = path.join(DATA_DIR, 'status-db.json');

// Strictly exclude non-vocabulary roots and system directories (pure vocabulary vault only: Greek, Latin, Vocab Master)
const EXCLUDED_ROOT_DIRS = new Set([
  'Content',
  '_archive',
  '.obsidian',
  '.git',
  '.gemini',
  'Apps',
  'node_modules',
  'Basic English',
  'Advanced english',
  'Philosophy'
]);

const EXCLUDED_ROOT_FILES = new Set([
  'Untitled.md',
  'Kernel Expansion.md',
  'Notion Superpowers & Fast Reading Guide.md',
  '.gitignore'
]);

// Core vault structure — these top-level folders cannot be deleted from the web app
const PROTECTED_ROOT_FOLDERS = new Set([
  'English vocabulary master',
  'Greek roots',
  'Latin roots'
]);

/**
 * Fast frontmatter parser reading only the header block of a markdown string
 */
function parseFrontmatter(rawHeader) {
  if (!rawHeader.startsWith('---')) return {};
  const endIdx = rawHeader.indexOf('\n---', 3);
  if (endIdx === -1) return {};
  const yamlBlock = rawHeader.slice(3, endIdx).replace(/\r/g, '');
  const lines = yamlBlock.split('\n');
  const fm = {};
  let currentKey = null;
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!currentList) {
        currentList = [];
        fm[currentKey] = currentList;
      }
      currentList.push(cleanYamlVal(listMatch[1]));
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const val = kvMatch[2].trim();
      if (val === '') {
        currentList = [];
        fm[currentKey] = currentList;
      } else {
        currentList = null;
        fm[currentKey] = cleanYamlVal(val);
      }
    }
  }
  return fm;
}

function cleanYamlVal(val) {
  let v = val.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v !== '' && !Number.isNaN(Number(v)) && /^[\d.]+$/.test(v)) return Number(v);
  return v;
}

/**
 * Update or insert a frontmatter key in a Markdown file content string
 */
function updateMarkdownFrontmatter(content, updates) {
  const hasCrlf = content.includes('\r\n');
  const nl = hasCrlf ? '\r\n' : '\n';
  if (content.startsWith('---')) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
    if (match) {
      let yamlLines = match[1].split(/\r?\n/);
      for (const [k, v] of Object.entries(updates)) {
        const keyRegex = new RegExp(`^${k}\\s*:`);
        const idx = yamlLines.findIndex(l => keyRegex.test(l));
        const formattedVal = typeof v === 'string' && (v.includes('[[') || v.includes(':')) ? `"${v}"` : v;
        if (idx !== -1) {
          yamlLines[idx] = `${k}: ${formattedVal}`;
        } else {
          yamlLines.push(`${k}: ${formattedVal}`);
        }
      }
      const rest = content.slice(match[0].length);
      return `---${nl}${yamlLines.join(nl)}${nl}---${nl}${rest}`;
    }
  }
  const yamlLines = Object.entries(updates).map(([k, v]) => `${k}: ${v}`);
  return `---${nl}${yamlLines.join(nl)}${nl}---${nl}${nl}${content}`;
}

/**
 * Copy and sanitize user's custom CSS snippets & banner assets from D:\Language
 */
async function syncVaultDesignAssets() {
  await fsp.mkdir(STYLES_DIR, { recursive: true });
  await fsp.mkdir(BANNERS_DIR, { recursive: true });
  await fsp.mkdir(DATA_DIR, { recursive: true });

  const snippetsDir = path.join(VAULT_ROOT, '.obsidian', 'snippets');
  const snippetFiles = [
    'web-colors.css',
    'web-layout.css',
    'web-typography.css',
    'web-components.css',
    'web-interactive.css',
    'web-reading-view.css',
    'language-folders-highlight.css',
    'vault-theme.css',
    'apple-toggle.css'
  ];

  for (const file of snippetFiles) {
    const srcPath = path.join(snippetsDir, file);
    if (fs.existsSync(srcPath)) {
      let css = await fsp.readFile(srcPath, 'utf8');
      if (file === 'language-folders-highlight.css') {
        css = css.replace(/\/\* =+\s*SECTION 3:.*?\/\* Ensure folder titles/s, '/* Ensure folder titles');
      }
      await fsp.writeFile(path.join(STYLES_DIR, file), css, 'utf8');
    }
  }

  const vaultBannersDir = path.join(VAULT_ROOT, '_assets', 'banners');
  if (fs.existsSync(vaultBannersDir)) {
    const entries = await fsp.readdir(vaultBannersDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name) && !entry.name.toLowerCase().includes('content')) {
        await fsp.copyFile(
          path.join(vaultBannersDir, entry.name),
          path.join(BANNERS_DIR, entry.name)
        );
      }
    }
  }
}

/**
 * Filter out Content Studio references from note markdown (e.g., 00 Language Hub.md line 357)
 */
function sanitizeNoteContent(relPath, markdown) {
  if (relPath === '00 Language Hub.md') {
    return markdown
      .split('\n')
      .filter(line => !line.includes('Content Studio') && !line.includes('[[Content/'))
      .join('\n');
  }
  return markdown;
}

// Persistent status overrides map synced with disk files
let statusDb = {};
let vaultIndex = {
  generatedAt: '',
  totalNotes: 0,
  pages: [],
  links: [],
  coreNotes: {}
};
let pageMapByPath = new Map();

async function loadStatusDb() {
  if (fs.existsSync(STATUS_DB_PATH)) {
    try {
      statusDb = JSON.parse(await fsp.readFile(STATUS_DB_PATH, 'utf8'));
    } catch {
      statusDb = {};
    }
  }
}

async function saveStatusDb() {
  try {
    await fsp.writeFile(STATUS_DB_PATH, JSON.stringify(statusDb, null, 2), 'utf8');
  } catch {
    // ignore
  }
}

/**
 * Ultra-fast Vault Indexer:
 * Reads full content & frontmatter of all ~1,150 core/hub/lesson/cluster/vocab notes,
 * and infers deterministic root/cluster metadata for the ~50,000 Greek/Latin root sub-files
 * directly from directory structure in < 1.5 seconds!
 */
async function buildVaultIndex(forceRebuild = false) {
  await loadStatusDb();
  const indexCachePath = path.join(DATA_DIR, 'vault-index.json');
  const coreNotesCachePath = path.join(DATA_DIR, 'core-notes.json');

  if (!forceRebuild && fs.existsSync(indexCachePath) && fs.existsSync(coreNotesCachePath)) {
    try {
      console.log('⚡ Loading cached vault index...');
      const cachedIndex = JSON.parse(await fsp.readFile(indexCachePath, 'utf8'));
      const cachedCore = JSON.parse(await fsp.readFile(coreNotesCachePath, 'utf8'));
      cachedIndex.pages = (cachedIndex.pages || []).filter(p => !p.p.includes('/scripts/'));
      cachedIndex.totalNotes = cachedIndex.pages.length;
      vaultIndex = { ...cachedIndex, coreNotes: cachedCore };
      pageMapByPath.clear();
      for (const p of vaultIndex.pages) {
        if (statusDb[p.p]) p.s = statusDb[p.p];
        pageMapByPath.set(p.p, p);
      }
      console.log(`✅ Loaded ${vaultIndex.totalNotes.toLocaleString()} vault notes from cache.`);
      return;
    } catch (e) {
      console.warn('Cache read failed, rebuilding index...', e.message);
    }
  }

  console.log(`🔍 Scanning Obsidian vault at ${VAULT_ROOT} (excluding Content Studio)...`);
  const t0 = Date.now();
  const pages = [];
  const coreNotes = {};
  const rawLinks = [];

  function walkDir(absDir, relDir) {
    let entries;
    try {
      entries = fs.readdirSync(absDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const name = entry.name;
      if (name.startsWith('.')) continue;
      const relPath = relDir ? `${relDir}/${name}` : name;
      const absPath = path.join(absDir, name);

      if (entry.isDirectory()) {
        if ((!relDir && EXCLUDED_ROOT_DIRS.has(name)) || name === 'scripts') continue;
        walkDir(absPath, relPath);
      } else if (entry.isFile() && name.endsWith('.md')) {
        if (!relDir && EXCLUDED_ROOT_FILES.has(name)) continue;

        const dirParts = relDir ? relDir.split('/') : [];
        const topFolder = dirParts[0] || '';
        const isDeepClassicalRootFile =
          (topFolder === 'Greek roots' || topFolder === 'Latin roots') &&
          dirParts.length >= 2 &&
          dirParts[1].startsWith('Cluster ');

        if (isDeepClassicalRootFile) {
          // Fast deterministic metadata from folder hierarchy:
          // <Greek roots | Latin roots>/<Cluster Name>/<Dashboard — root>/<word>.md
          const clusterName = dirParts[1] || '';
          const rootFolderName = dirParts[2] || '';
          const baseName = name.slice(0, -3);
          const pageObj = {
            p: relPath,
            s: statusDb[relPath] || 'unread'
          };

          if (dirParts.length === 2 && baseName.startsWith('Cluster ')) {
            // Cluster MOC note (read full content so it's preloaded!)
            try {
              const fullText = fs.readFileSync(absPath, 'utf8');
              const fm = parseFrontmatter(fullText.slice(0, 800));
              if (fm.status) pageObj.s = statusDb[relPath] || String(fm.status);
              if (fm.type) pageObj.t = String(fm.type);
              coreNotes[relPath] = fullText;
            } catch {
              // ignore
            }
          } else if (baseName.startsWith('Dashboard')) {
            pageObj.t = 'root_dashboard';
            pageObj.c = `[[${clusterName}]]`;
            rawLinks.push([`${topFolder}/${clusterName}/${clusterName}.md`, relPath]);
          } else if (baseName.startsWith('Word Triage')) {
            pageObj.t = 'word_triage';
            pageObj.c = `[[${clusterName}]]`;
          } else {
            // Derived vocabulary word card
            pageObj.c = `[[${clusterName}]]`;
            const rootLink = `[[${rootFolderName || baseName}]]`;
            if (topFolder === 'Latin roots') {
              pageObj.lr = rootLink;
            } else {
              pageObj.gr = rootLink;
            }
          }

          pages.push(pageObj);
          continue;
        }

        // For all other notes (~1,150 files: Hub, Basic English, Advanced english, Vocabulary Master, Philosophy, Root MOCs), read full content!
        try {
          const fullText = fs.readFileSync(absPath, 'utf8');
          const fm = parseFrontmatter(fullText.slice(0, 1200));

          coreNotes[relPath] = sanitizeNoteContent(relPath, fullText);

          const linkRegex = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g;
          let m;
          let count = 0;
          while ((m = linkRegex.exec(fullText)) !== null && count < 45) {
            const target = m[1].trim();
            if (target && !target.startsWith('Content') && !target.endsWith('.jpg') && !target.endsWith('.png')) {
              rawLinks.push([relPath, target]);
              count++;
            }
          }

          const pageObj = { p: relPath };
          if (statusDb[relPath]) {
            pageObj.s = statusDb[relPath];
          } else if (fm.status !== undefined) {
            pageObj.s = String(fm.status);
          }
          if (fm.type) pageObj.t = String(fm.type);
          if (fm.cluster) {
            pageObj.c = String(fm.cluster);
          } else if (dirParts.length >= 2 && dirParts[1].startsWith('Cluster ')) {
            pageObj.c = `[[${dirParts[1]}]]`;
          }
          if (fm.latin_root) pageObj.lr = String(fm.latin_root);
          if (fm.greek_root) pageObj.gr = String(fm.greek_root);
          if (fm.section) pageObj.sec = String(fm.section);
          if (fm.tags) pageObj.tg = Array.isArray(fm.tags) ? fm.tags : [String(fm.tags)];
          if (fm.aliases) pageObj.al = Array.isArray(fm.aliases) ? fm.aliases : [String(fm.aliases)];
          if (fm.cssclasses) pageObj.css = Array.isArray(fm.cssclasses) ? fm.cssclasses : [String(fm.cssclasses)];
          if (fm.banner) pageObj.b = String(fm.banner);
          if (fm.banner_icon) pageObj.bi = String(fm.banner_icon);
          if (fm.banner_y !== undefined) pageObj.by = fm.banner_y;

          pages.push(pageObj);
        } catch {
          // ignore
        }
      }
    }
  }

  walkDir(VAULT_ROOT, '');

  pages.sort((a, b) => a.p.localeCompare(b.p));
  pageMapByPath.clear();
  for (const p of pages) {
    pageMapByPath.set(p.p, p);
  }

  const indexPayload = {
    generatedAt: new Date().toISOString(),
    totalNotes: pages.length,
    pages,
    links: rawLinks
  };

  vaultIndex = { ...indexPayload, coreNotes };

  await fsp.writeFile(indexCachePath, JSON.stringify(indexPayload), 'utf8');
  await fsp.writeFile(coreNotesCachePath, JSON.stringify(coreNotes), 'utf8');

  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(`✅ Indexed ${pages.length.toLocaleString()} notes & ${Object.keys(coreNotes).length} preloaded core notes in ${elapsed}s.`);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

function sendJson(req, res, status, data) {
  const json = JSON.stringify(data);
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (acceptEncoding.includes('gzip') && json.length > 2048) {
    zlib.gzip(Buffer.from(json), (err, compressed) => {
      if (err) {
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(json);
        return;
      }
      res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Encoding': 'gzip',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(compressed);
    });
  } else {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    res.end(json);
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function resolveSafeVaultPath(relPath) {
  const normalized = String(relPath || '').replace(/\\/g, '/').replace(/^\/+/, '');
  const topSegment = normalized.split('/')[0];
  if (EXCLUDED_ROOT_DIRS.has(topSegment)) {
    throw new Error('Access to excluded directory is forbidden');
  }
  const absPath = path.resolve(VAULT_ROOT, normalized);
  const resolvedRoot = path.resolve(VAULT_ROOT);
  if (!absPath.startsWith(resolvedRoot)) {
    throw new Error('Path traversal forbidden');
  }
  return { normalized, absPath };
}

/* ============================================================================
   INCREMENTAL VAULT INDEX UPDATES (create / rename / delete without full rescan)
   ============================================================================ */

function renamePathInIndex(from, to) {
  const isFolder = !from.endsWith('.md');
  const prefix = from + '/';
  const match = p => (isFolder ? p.startsWith(prefix) : p === from);
  const remap = p => (isFolder ? to + p.slice(from.length) : to);

  for (const entry of vaultIndex.pages) {
    if (match(entry.p)) {
      pageMapByPath.delete(entry.p);
      entry.p = remap(entry.p);
      pageMapByPath.set(entry.p, entry);
    }
  }
  for (const key of Object.keys(vaultIndex.coreNotes)) {
    if (match(key)) {
      vaultIndex.coreNotes[remap(key)] = vaultIndex.coreNotes[key];
      delete vaultIndex.coreNotes[key];
    }
  }
  for (const link of vaultIndex.links) {
    if (match(link[0])) link[0] = remap(link[0]);
    if (link[1] === from) link[1] = to;
  }
  for (const key of Object.keys(statusDb)) {
    if (match(key)) {
      statusDb[remap(key)] = statusDb[key];
      delete statusDb[key];
    }
  }
  saveStatusDb();
}

function removePathFromIndex(target) {
  const isFolder = !target.endsWith('.md');
  const prefix = target + '/';
  vaultIndex.pages = vaultIndex.pages.filter(p => {
    const hit = isFolder ? p.p.startsWith(prefix) : p.p === target;
    if (hit) pageMapByPath.delete(p.p);
    return !hit;
  });
  for (const key of Object.keys(vaultIndex.coreNotes)) {
    if (isFolder ? key.startsWith(prefix) : key === target) delete vaultIndex.coreNotes[key];
  }
  vaultIndex.links = vaultIndex.links.filter(l =>
    !(isFolder ? l[0].startsWith(prefix) : l[0] === target)
  );
  for (const key of Object.keys(statusDb)) {
    if (isFolder ? key.startsWith(prefix) : key === target) delete statusDb[key];
  }
  saveStatusDb();
}

function addPathToIndex(normalized, content) {
  if (pageMapByPath.has(normalized)) return;
  const entry = { p: normalized, s: statusDb[normalized] || 'unread' };
  vaultIndex.pages.push(entry);
  vaultIndex.pages.sort((a, b) => a.p.localeCompare(b.p));
  pageMapByPath.set(normalized, entry);
  vaultIndex.totalNotes = vaultIndex.pages.length;
  if (typeof content === 'string') {
    vaultIndex.coreNotes[normalized] = content;
  }
}

let indexRebuildTimer = null;
let indexRebuildRunning = false;

/**
 * Structural changes (create/rename/delete) or external disk edits mutate the in-memory index,
 * with debounced full rebuild to refresh the on-disk cache.
 */
function scheduleIndexRebuild() {
  clearTimeout(indexRebuildTimer);
  indexRebuildTimer = setTimeout(async () => {
    if (indexRebuildRunning) return;
    indexRebuildRunning = true;
    try {
      await buildVaultIndex(true);
      console.log('♻️  Vault index rebuilt after vault change.');
    } catch (e) {
      console.warn('Index rebuild failed:', e.message);
    } finally {
      indexRebuildRunning = false;
    }
  }, 1200);
}

/**
 * Live File Watcher: monitors App database for additions, edits, and deletions
 * so any updates made via Obsidian, editors, or external scripts are reflected live.
 */
function setupVaultWatcher() {
  try {
    if (!fs.existsSync(VAULT_ROOT)) return;
    const watcher = fs.watch(VAULT_ROOT, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      const normalized = filename.replace(/\\/g, '/');
      if (normalized.startsWith('.') || normalized.includes('/.') || normalized.startsWith('_')) return;
      if (!normalized.endsWith('.md') && !normalized.endsWith('.json')) return;
      console.log(`📡 Vault change detected [${eventType}]: ${normalized}`);
      scheduleIndexRebuild();
    });
    watcher.on('error', (err) => {
      console.warn('Vault watcher notice:', err.message);
    });
    console.log(`👀 Live Vault Watcher active on: ${VAULT_ROOT}`);
  } catch (err) {
    console.warn('Could not setup recursive vault watcher:', err.message);
  }
}

async function startServer() {
  await syncVaultDesignAssets();
  await buildVaultIndex(process.argv.includes('--index-only') || process.argv.includes('--rebuild'));

  if (process.argv.includes('--index-only')) {
    console.log('Index build complete.');
    process.exit(0);
  }

  setupVaultWatcher();

  // Initialize Bi-directional Git Auto-Sync Engine
  await gitSync.init(VAULT_ROOT, {
    onNewCommits: () => {
      console.log('🔄 Rebuilding vault index after Git pull...');
      scheduleIndexRebuild();
    }
  });

  const server = http.createServer(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
      }

      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const pathname = decodeURIComponent(urlObj.pathname);

      // Auth Guard: Protect all /api/* endpoints (except auth routes) if AUTH_TOKEN is set
      if (AUTH_TOKEN && pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
        const authHeader = req.headers['authorization'] || '';
        const tokenQuery = urlObj.searchParams.get('token');
        const tokenCookie = (req.headers.cookie || '')
          .split(';')
          .map(c => c.trim())
          .find(c => c.startsWith('auth_token='))
          ?.split('=')[1];
        const providedToken = authHeader.replace(/^Bearer\s+/i, '').trim() || tokenQuery || tokenCookie;

        if (providedToken !== AUTH_TOKEN) {
          sendJson(req, res, 401, { error: 'Unauthorized: Valid vault passcode or token required' });
          return;
        }
      }

      // 0. API: Auth Verification & Login
      if (pathname === '/api/auth/status' && req.method === 'GET') {
        sendJson(req, res, 200, {
          authRequired: Boolean(AUTH_TOKEN),
          authenticated: !AUTH_TOKEN
        });
        return;
      }

      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const inputPass = String(body.password || body.token || '').trim();
        if (!AUTH_TOKEN || inputPass === AUTH_TOKEN) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `auth_token=${encodeURIComponent(AUTH_TOKEN || 'open')}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`
          });
          res.end(JSON.stringify({ ok: true, token: AUTH_TOKEN || 'open' }));
        } else {
          sendJson(req, res, 401, { error: 'Invalid vault passcode' });
        }
        return;
      }

      // 0b. API: Git Sync Status & Manual Sync
      if (pathname === '/api/sync' && req.method === 'GET') {
        sendJson(req, res, 200, gitSync.getStatus());
        return;
      }

      if (pathname === '/api/sync' && req.method === 'POST') {
        const syncResult = await gitSync.manualSync();
        sendJson(req, res, 200, syncResult);
        return;
      }

      // 1. API: Vault Status & Index
      if (pathname === '/api/vault-index' && req.method === 'GET') {
        sendJson(req, res, 200, {
          generatedAt: vaultIndex.generatedAt,
          totalNotes: vaultIndex.totalNotes,
          pages: vaultIndex.pages,
          links: vaultIndex.links,
          liveSync: true
        });
        return;
      }

      // 2. API: Read Single Note Content
      if (pathname === '/api/note' && req.method === 'GET') {
        const relQuery = urlObj.searchParams.get('path') || '00 Language Hub.md';
        const { normalized, absPath } = resolveSafeVaultPath(relQuery);
        if (!fs.existsSync(absPath)) {
          sendJson(req, res, 404, { error: `Note not found: ${normalized}` });
          return;
        }
        const rawContent = await fsp.readFile(absPath, 'utf8');
        const content = sanitizeNoteContent(normalized, rawContent);
        const stat = await fsp.stat(absPath);
        sendJson(req, res, 200, {
          path: normalized,
          content,
          mtime: stat.mtimeMs
        });
        return;
      }

      // 3. API: Update Frontmatter (e.g. Apple 3-state status toggle or Meta Bind)
      if (pathname === '/api/frontmatter' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const { path: relQuery, updates } = body;
        const { normalized, absPath } = resolveSafeVaultPath(relQuery);
        if (!fs.existsSync(absPath)) {
          sendJson(req, res, 404, { error: `Note not found: ${normalized}` });
          return;
        }
        const currentContent = await fsp.readFile(absPath, 'utf8');
        const updatedContent = updateMarkdownFrontmatter(currentContent, updates || {});
        await fsp.writeFile(absPath, updatedContent, 'utf8');

        let pageEntry = pageMapByPath.get(normalized);
        if (pageEntry && updates) {
          if (updates.status !== undefined) {
            pageEntry.s = String(updates.status);
            statusDb[normalized] = String(updates.status);
            await saveStatusDb();
          }
          if (updates.tags !== undefined) pageEntry.tg = Array.isArray(updates.tags) ? updates.tags : [String(updates.tags)];
        }
        if (vaultIndex.coreNotes[normalized]) {
          vaultIndex.coreNotes[normalized] = sanitizeNoteContent(normalized, updatedContent);
        }

        gitSync.queueChange(normalized, 'edit');
        sendJson(req, res, 200, { ok: true, path: normalized, updates });
        return;
      }

      // 4. API: Save / Create / Edit Note Content
      if (pathname === '/api/note' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const { path: relQuery, content, append } = body;
        const { normalized, absPath } = resolveSafeVaultPath(relQuery);
        await fsp.mkdir(path.dirname(absPath), { recursive: true });

        let finalContent = String(content ?? '');
        if (append && fs.existsSync(absPath)) {
          const existing = await fsp.readFile(absPath, 'utf8');
          finalContent = existing + '\n\n' + finalContent;
        }
        await fsp.writeFile(absPath, finalContent, 'utf8');

        const fm = parseFrontmatter(finalContent.slice(0, 1000));
        let pageEntry = pageMapByPath.get(normalized);
        if (!pageEntry) {
          pageEntry = { p: normalized };
          vaultIndex.pages.push(pageEntry);
          pageMapByPath.set(normalized, pageEntry);
          vaultIndex.totalNotes = vaultIndex.pages.length;
        }
        if (fm.status) {
          pageEntry.s = String(fm.status);
          statusDb[normalized] = String(fm.status);
          await saveStatusDb();
        }
        if (fm.tags) pageEntry.tg = Array.isArray(fm.tags) ? fm.tags : [String(fm.tags)];
        vaultIndex.coreNotes[normalized] = sanitizeNoteContent(normalized, finalContent);

        gitSync.queueChange(normalized, 'edit');
        sendJson(req, res, 200, { ok: true, path: normalized });
        return;
      }

      // 5. API: Delete Note OR Folder (recursive)
      if (pathname === '/api/note' && req.method === 'DELETE') {
        const relQuery = urlObj.searchParams.get('path');
        const isFolder = urlObj.searchParams.get('type') === 'folder';
        const { normalized, absPath } = resolveSafeVaultPath(relQuery);
        if (fs.existsSync(absPath)) {
          if (isFolder) {
            if (PROTECTED_ROOT_FOLDERS.has(normalized)) {
              throw new Error(`"${normalized}" is protected vault structure and cannot be deleted`);
            }
            await fsp.rm(absPath, { recursive: true, force: true });
          } else {
            await fsp.unlink(absPath);
          }
        }
        if (isFolder) {
          removePathFromIndex(normalized);
          scheduleIndexRebuild();
        } else {
          removePathFromIndex(normalized);
        }
        gitSync.queueChange(normalized, isFolder ? 'folder-delete' : 'delete');
        sendJson(req, res, 200, { ok: true, path: normalized });
        return;
      }

      // 5b. API: Create Note or Folder
      if (pathname === '/api/create' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const { path: relPath, content = '', isFolder = false } = body;
        const { normalized, absPath } = resolveSafeVaultPath(relPath);
        if (!normalized || normalized.endsWith('/')) throw new Error('Invalid path');
        if (fs.existsSync(absPath)) {
          sendJson(req, res, 409, { error: `Already exists: ${normalized}` });
          return;
        }
        if (isFolder) {
          await fsp.mkdir(absPath, { recursive: true });
        } else {
          await fsp.mkdir(path.dirname(absPath), { recursive: true });
          await fsp.writeFile(absPath, String(content ?? ''), 'utf8');
          addPathToIndex(normalized, String(content ?? ''));
          scheduleIndexRebuild();
        }
        gitSync.queueChange(normalized, isFolder ? 'folder-create' : 'create');
        sendJson(req, res, 200, { ok: true, path: normalized, isFolder });
        return;
      }

      // 5c. API: Rename / Move Note or Folder (drag & drop uses this too)
      if (pathname === '/api/rename' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const from = resolveSafeVaultPath(body.from);
        const to = resolveSafeVaultPath(body.to);
        if (!from.normalized || !to.normalized) throw new Error('Invalid paths');
        if (!fs.existsSync(from.absPath)) {
          sendJson(req, res, 404, { error: `Not found: ${from.normalized}` });
          return;
        }
        if (fs.existsSync(to.absPath)) {
          sendJson(req, res, 409, { error: `Target already exists: ${to.normalized}` });
          return;
        }
        // Block moving a folder into its own subtree
        if (to.normalized.startsWith(from.normalized + '/')) {
          throw new Error('Cannot move a folder into itself');
        }
        await fsp.mkdir(path.dirname(to.absPath), { recursive: true });
        await fsp.rename(from.absPath, to.absPath);
        renamePathInIndex(from.normalized, to.normalized);
        scheduleIndexRebuild();
        gitSync.queueChange(to.normalized, 'rename');
        sendJson(req, res, 200, { ok: true, from: from.normalized, to: to.normalized });
        return;
      }

      // 6. API: Serve Vault Images / Banners
      if (pathname === '/api/asset' && req.method === 'GET') {
        const relQuery = urlObj.searchParams.get('path') || '';
        const { absPath } = resolveSafeVaultPath(relQuery);
        if (fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
          const ext = path.extname(absPath).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
            'Cache-Control': 'public, max-age=3600'
          });
          fs.createReadStream(absPath).pipe(res);
          return;
        }
        res.writeHead(404);
        res.end('Asset not found');
        return;
      }

      // 7. API: Full-Text & Metadata Search
      if (pathname === '/api/search' && req.method === 'GET') {
        const q = (urlObj.searchParams.get('q') || '').trim().toLowerCase();
        const discipline = urlObj.searchParams.get('discipline') || '';
        const statusFilter = urlObj.searchParams.get('status') || '';
        const limit = Math.min(Number(urlObj.searchParams.get('limit') || 60), 200);

        const results = [];
        for (const p of vaultIndex.pages) {
          if (discipline && !p.p.startsWith(discipline + '/')) continue;
          const st = p.s || 'unread';
          if (statusFilter && st !== statusFilter) continue;

          const fileName = p.p.slice(p.p.lastIndexOf('/') + 1, -3);
          const lowerPath = p.p.toLowerCase();
          let score = 0;

          if (!q) {
            score = 1;
          } else if (fileName.toLowerCase() === q) {
            score = 100;
          } else if (fileName.toLowerCase().startsWith(q)) {
            score = 80;
          } else if (lowerPath.includes(q)) {
            score = 50;
          } else if (p.al && p.al.some(a => a.toLowerCase().includes(q))) {
            score = 60;
          } else if (p.tg && p.tg.some(t => t.toLowerCase().includes(q))) {
            score = 40;
          } else if (vaultIndex.coreNotes[p.p] && vaultIndex.coreNotes[p.p].toLowerCase().includes(q)) {
            score = 25;
          }

          if (score > 0) {
            let snippet = '';
            const body = vaultIndex.coreNotes[p.p];
            if (body && q) {
              const idx = body.toLowerCase().indexOf(q);
              if (idx !== -1) {
                snippet = body.slice(Math.max(0, idx - 45), idx + 95).replace(/\r?\n/g, ' ');
              }
            }
            results.push({ path: p.p, status: st, score, snippet, tags: p.tg || [] });
            if (!q && results.length >= limit) break;
          }
        }

        results.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
        sendJson(req, res, 200, { results: results.slice(0, limit) });
        return;
      }

      // 8. API: Force Re-index Vault
      if (pathname === '/api/reindex' && (req.method === 'GET' || req.method === 'POST')) {
        await syncVaultDesignAssets();
        await buildVaultIndex(true);
        sendJson(req, res, 200, { ok: true, totalNotes: vaultIndex.totalNotes, generatedAt: vaultIndex.generatedAt });
        return;
      }

      // 8b. Dynamic Sitemap XML for CRW Map & Crawler Discovery
      if (pathname === '/sitemap.xml' && req.method === 'GET') {
        const baseUrl = `http://${req.headers.host || `localhost:${PORT}`}`;
        const urls = [
          `${baseUrl}/`,
          `${baseUrl}/?view=graph`,
          `${baseUrl}/?view=studio`,
          `${baseUrl}/?view=scratchpad`,
          ...Object.keys(vaultIndex.coreNotes).slice(0, 300).map(p => `${baseUrl}/?note=${encodeURIComponent(p)}`)
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls.map(u => `  <url><loc>${u.replace(/&/g, '&amp;')}</loc></url>`).join('\n') +
          `\n</urlset>`;
        res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
        res.end(xml);
        return;
      }

      // 9. Static Files from public/
      let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
      if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(PUBLIC_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const rawBuf = await fsp.readFile(filePath);
      const acceptEncoding = req.headers['accept-encoding'] || '';
      // Dev-friendly: always revalidate app source so edits show up on reload
      const revalidate = ext === '.html' || ext === '.js' || ext === '.mjs' || ext === '.css';
      const cacheControl = revalidate ? 'no-cache' : 'public, max-age=3600';

      if (acceptEncoding.includes('gzip') && rawBuf.length > 2048 && (ext === '.json' || ext === '.js' || ext === '.css' || ext === '.html')) {
        zlib.gzip(rawBuf, (err, compressed) => {
          if (err) {
            res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheControl });
            res.end(rawBuf);
            return;
          }
          res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'gzip', 'Cache-Control': cacheControl });
          res.end(compressed);
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheControl });
        res.end(rawBuf);
      }
    } catch (err) {
      console.error('Server error:', err);
      sendJson(req, res, 500, { error: err.message || 'Internal Server Error' });
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🏛️  Obsidian Language & Philology Web App running at:`);
    console.log(`   ➜ Desktop: http://localhost:${PORT}`);
    console.log(`   ➜ Vault:   ${VAULT_ROOT} (${vaultIndex.totalNotes.toLocaleString()} notes indexed, Content Studio excluded)\n`);
  });
}

startServer();
