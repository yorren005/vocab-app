/**
 * Full-Fidelity Obsidian DataviewJS + App + Meta Bind Runtime Engine
 * Executes real vault ```dataviewjs blocks and Meta Bind INPUT[...] widgets
 * against the live 52,000+ note vault index with instant UI reactivity.
 */

export class DataviewLink {
  constructor(path, display, resolvedPath) {
    const cleanRaw = String(path || '').replace(/^\[\[|\]\]$/g, '');
    const [targetPart, aliasPart] = cleanRaw.split('|');
    const cleanTarget = (targetPart || '').trim();
    const fileName = cleanTarget.split('/').pop().replace(/\.md$/i, '');

    this.path = resolvedPath || (cleanTarget.endsWith('.md') ? cleanTarget : `${cleanTarget}.md`);
    this.fileName = fileName;
    this.display = display || aliasPart || fileName;
    this.type = 'file';
  }

  toHTML() {
    const escPath = escapeAttr(this.path);
    const escDisplay = escapeHtml(this.display || this.fileName);
    return `<a class="internal-link" data-href="${escPath}" href="/?note=${encodeURIComponent(this.path)}">${escDisplay}</a>`;
  }

  toString() {
    return this.toHTML();
  }
}

export class DataArray extends Array {
  static fromArray(arr) {
    const da = new DataArray();
    for (let i = 0; i < arr.length; i++) {
      da.push(arr[i]);
    }
    return da;
  }

  where(predicate) {
    const out = new DataArray();
    for (let i = 0; i < this.length; i++) {
      try {
        if (predicate(this[i], i, this)) out.push(this[i]);
      } catch {
        // ignore predicate error on individual item
      }
    }
    return out;
  }

  filter(predicate) {
    return this.where(predicate);
  }

  map(fn) {
    const out = new DataArray();
    for (let i = 0; i < this.length; i++) {
      out.push(fn(this[i], i, this));
    }
    return out;
  }

  sort(keyOrComparator, direction = 'asc') {
    if (typeof keyOrComparator === 'function' && keyOrComparator.length >= 2) {
      super.sort(keyOrComparator);
      return this;
    }
    const copy = DataArray.fromArray(this);
    const dir = String(direction).toLowerCase() === 'desc' ? -1 : 1;
    if (typeof keyOrComparator === 'function') {
      Array.prototype.sort.call(copy, (a, b) => {
        const va = keyOrComparator(a);
        const vb = keyOrComparator(b);
        return String(va ?? '').localeCompare(String(vb ?? ''), undefined, { numeric: true }) * dir;
      });
    } else {
      Array.prototype.sort.call(copy);
    }
    return copy;
  }

  limit(count) {
    return DataArray.fromArray(this.slice(0, count));
  }

  array() {
    return Array.from(this);
  }

  get values() {
    return this;
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

/**
 * VaultRuntime manages the hydrated page objects and provides `dv`, `app`, and `Notice`
 */
export class VaultRuntime {
  constructor(vaultController) {
    this.controller = vaultController;
    this.pagesByPath = new Map();
    this.pagesByName = new Map();
    this.pagesByFolder = new Map();
    this.allHydratedPages = new DataArray();
  }

  /**
   * Hydrate compact index entries (`{ p, s, t, c, lr, gr, sec, tg, al, css, b, bi, by }`)
   * into rich Dataview page objects.
   */
  hydrateIndex(rawPages, localStatusOverrides = {}) {
    this.pagesByPath.clear();
    this.pagesByName.clear();
    this.pagesByFolder.clear();
    this.allHydratedPages = new DataArray();

    // Pass 1: register path lookup by filename for fast wikilink resolution
    for (let i = 0; i < rawPages.length; i++) {
      const rp = rawPages[i];
      const normPath = rp.p.replace(/\\/g, '/');
      const lastSlash = normPath.lastIndexOf('/');
      const fileName = normPath.slice(lastSlash + 1).replace(/\.md$/i, '');
      if (!this.pagesByName.has(fileName.toLowerCase())) {
        this.pagesByName.set(fileName.toLowerCase(), normPath);
      }
      // Also register aliases
      if (rp.al) {
        for (const alias of rp.al) {
          const lowerAlias = String(alias).toLowerCase();
          if (!this.pagesByName.has(lowerAlias)) {
            this.pagesByName.set(lowerAlias, normPath);
          }
        }
      }
    }

    // Pass 2: build full Dataview page objects
    for (let i = 0; i < rawPages.length; i++) {
      const rp = rawPages[i];
      const normPath = rp.p.replace(/\\/g, '/');
      const lastSlash = normPath.lastIndexOf('/');
      const folder = lastSlash !== -1 ? normPath.slice(0, lastSlash) : '';
      const fileName = normPath.slice(lastSlash + 1).replace(/\.md$/i, '');

      const fileLink = new DataviewLink(normPath, fileName, normPath);

      const page = {
        file: {
          name: fileName,
          path: normPath,
          folder: folder,
          link: fileLink,
          ext: 'md'
        }
      };

      // Status (respect local overrides first, then frontmatter `s`)
      const overrideStatus = localStatusOverrides[normPath];
      if (overrideStatus !== undefined) {
        page.status = overrideStatus;
      } else if (rp.s !== undefined) {
        page.status = rp.s;
      }

      if (rp.t !== undefined) page.type = rp.t;
      if (rp.sec !== undefined) page.section = rp.sec;
      if (rp.tg !== undefined) page.tags = rp.tg;
      if (rp.al !== undefined) page.aliases = rp.al;
      if (rp.css !== undefined) page.cssclasses = rp.css;
      if (rp.b !== undefined) page.banner = rp.b;
      if (rp.bi !== undefined) page.banner_icon = rp.bi;
      if (rp.by !== undefined) page.banner_y = rp.by;

      if (rp.c !== undefined) {
        page.cluster = this.parseFrontmatterLink(rp.c, folder);
      }
      if (rp.lr !== undefined) {
        page.latin_root = this.parseFrontmatterLink(rp.lr, folder);
      }
      if (rp.gr !== undefined) {
        page.greek_root = this.parseFrontmatterLink(rp.gr, folder);
      }

      this.pagesByPath.set(normPath, page);
      this.allHydratedPages.push(page);

      const topFolder = folder.split('/')[0] || '';
      if (topFolder) {
        if (!this.pagesByFolder.has(topFolder)) {
          this.pagesByFolder.set(topFolder, new DataArray());
        }
        this.pagesByFolder.get(topFolder).push(page);
      }
    }
  }

  parseFrontmatterLink(rawVal, contextFolder = '') {
    const str = String(rawVal || '').trim();
    const match = str.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/);
    const targetName = match ? match[1].trim() : str;
    const display = match && match[2] ? match[2].trim() : targetName.split('/').pop().replace(/\.md$/i, '');

    // Resolve path in the same folder or globally
    let resolved = this.resolveLinkPath(targetName, contextFolder);
    return new DataviewLink(targetName, display, resolved);
  }

  resolveLinkPath(linkText, sourcePath = '') {
    if (!linkText) return '00 Language Hub.md';
    let clean = String(linkText)
      .replace(/^\[\[|\]\]$/g, '')
      .split('|')[0]
      .split('#')[0]
      .trim()
      .replace(/\\/g, '/');

    if (!clean) return sourcePath || '00 Language Hub.md';

    // 1. Direct path match with or without .md
    const withMd = clean.endsWith('.md') ? clean : `${clean}.md`;
    if (this.pagesByPath.has(withMd)) return withMd;

    // 2. Relative to source folder
    if (sourcePath) {
      const srcFolder = sourcePath.includes('/')
        ? sourcePath.slice(0, sourcePath.lastIndexOf('/'))
        : sourcePath;
      const parts = srcFolder.split('/');
      for (let depth = parts.length; depth >= 1; depth--) {
        const prefix = parts.slice(0, depth).join('/');
        const candidate = `${prefix}/${withMd}`;
        if (this.pagesByPath.has(candidate)) return candidate;
        // Also check folder note candidate: prefix/clean/clean.md
        const folderNoteCandidate = `${prefix}/${clean}/${clean}.md`;
        if (this.pagesByPath.has(folderNoteCandidate)) return folderNoteCandidate;
      }
    }

    // 3. Global filename or alias lookup
    const baseName = clean.split('/').pop().replace(/\.md$/i, '').toLowerCase();
    if (this.pagesByName.has(baseName)) {
      return this.pagesByName.get(baseName);
    }

    // 4. Top-level folder note check (e.g. "Latin roots" -> "Latin roots/Latin roots.md")
    const topFolderNote = `${clean}/${clean}.md`;
    if (this.pagesByPath.has(topFolderNote)) return topFolderNote;

    return withMd;
  }

  /**
   * Execute a DataviewJS code string inside a specific DOM container for a given note path
   */
  executeDataviewJS(code, containerEl, currentFilePath) {
    containerEl.innerHTML = '';
    const self = this;
    const currentPage = this.pagesByPath.get(currentFilePath) || {
      file: {
        name: currentFilePath.split('/').pop().replace(/\.md$/i, ''),
        path: currentFilePath,
        folder: currentFilePath.includes('/') ? currentFilePath.slice(0, currentFilePath.lastIndexOf('/')) : '',
        link: new DataviewLink(currentFilePath, '', currentFilePath)
      },
      status: 'unread'
    };

    const dv = {
      container: containerEl,
      currentFilePath: currentFilePath,
      current() {
        return currentPage;
      },
      pages(query = '') {
        const q = String(query || '').trim().replace(/^['"]|['"]$/g, '').replace(/\\/g, '/');
        if (!q) return self.allHydratedPages;
        if (q.startsWith('#')) {
          const tag = q.slice(1).toLowerCase();
          return self.allHydratedPages.where(p => Array.isArray(p.tags) && p.tags.some(t => String(t).toLowerCase() === tag));
        }
        // Fast path if querying a top-level discipline folder
        if (!q.includes('/') && self.pagesByFolder.has(q)) {
          return self.pagesByFolder.get(q);
        }
        // Subfolder prefix match
        const prefix = `${q}/`;
        const topFolder = q.split('/')[0];
        const pool = self.pagesByFolder.get(topFolder) || self.allHydratedPages;
        return pool.where(p => p.file.folder === q || p.file.folder.startsWith(prefix));
      },
      fileLink(path, embed = false, display = '') {
        const resolved = self.resolveLinkPath(path, currentFilePath);
        return new DataviewLink(path, display, resolved);
      },
      paragraph(content) {
        const div = document.createElement('div');
        div.className = 'dv-paragraph';
        appendCellContent(div, content, self, currentFilePath);
        containerEl.appendChild(div);
        return div;
      },
      span(content) {
        const sp = document.createElement('span');
        appendCellContent(sp, content, self, currentFilePath);
        containerEl.appendChild(sp);
        return sp;
      },
      header(level, content) {
        const h = document.createElement(`h${Math.min(Math.max(Number(level) || 2, 1), 6)}`);
        appendCellContent(h, content, self, currentFilePath);
        containerEl.appendChild(h);
        return h;
      },
      el(tag, content, attrs = {}) {
        const el = document.createElement(tag || 'div');
        if (attrs.cls) el.className = Array.isArray(attrs.cls) ? attrs.cls.join(' ') : attrs.cls;
        if (attrs.attr) {
          for (const [k, v] of Object.entries(attrs.attr)) el.setAttribute(k, v);
        }
        appendCellContent(el, content, self, currentFilePath);
        containerEl.appendChild(el);
        return el;
      },
      list(items) {
        const ul = document.createElement('ul');
        ul.className = 'dataview list-view-ul';
        if (items) {
          for (const item of items) {
            const li = document.createElement('li');
            appendCellContent(li, item, self, currentFilePath);
            ul.appendChild(li);
          }
        }
        containerEl.appendChild(ul);
        return ul;
      },
      table(headers, rows) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-scroll-wrapper';
        const table = document.createElement('table');
        table.className = 'dataview table-view-table';

        if (headers && headers.length) {
          const thead = document.createElement('thead');
          const tr = document.createElement('tr');
          for (const h of headers) {
            const th = document.createElement('th');
            appendCellContent(th, h, self, currentFilePath);
            tr.appendChild(th);
          }
          thead.appendChild(tr);
          table.appendChild(thead);
        }

        const tbody = document.createElement('tbody');
        if (rows) {
          for (const row of rows) {
            const tr = document.createElement('tr');
            for (const cell of row) {
              const td = document.createElement('td');
              appendCellContent(td, cell, self, currentFilePath);
              tr.appendChild(td);
            }
            tbody.appendChild(tr);
          }
        }
        table.appendChild(tbody);
        wrapper.appendChild(table);
        containerEl.appendChild(wrapper);
        return table;
      }
    };

    // Mock Obsidian `app` object for `app.vault`, `app.fileManager.processFrontMatter`, `app.workspace.openLinkText`
    const app = {
      vault: {
        getAbstractFileByPath(filePath) {
          const resolved = self.resolveLinkPath(filePath, currentFilePath);
          return { path: resolved, name: resolved.split('/').pop() };
        }
      },
      fileManager: {
        async processFrontMatter(file, mutatorFn) {
          if (!file || !file.path) return;
          const page = self.pagesByPath.get(file.path);
          const fmProxy = { status: page ? page.status || 'unread' : 'unread' };
          mutatorFn(fmProxy);
          await self.controller.updateNoteFrontmatter(file.path, fmProxy, false);
        }
      },
      workspace: {
        openLinkText(linkText, sourcePath, newLeaf = false) {
          const resolved = self.resolveLinkPath(linkText, sourcePath || currentFilePath);
          self.controller.openNote(resolved, { newTab: Boolean(newLeaf) });
        }
      }
    };

    class Notice {
      constructor(message, duration = 2600) {
        self.controller.showNotice(message, duration);
      }
    }

    const defaultMakeAppleToggle = (rawStatus, filePath, fileName) => {
      const states = [
        { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
        { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
        { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
      ];
      let curIdx = states.findIndex(s => s.key === rawStatus);
      if (curIdx === -1) curIdx = 0;

      const toggle = document.createElement('div');
      toggle.className = 'apple-c';
      toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

      const track = document.createElement('div');
      track.className = 'track-c';
      track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

      const label = document.createElement('span');
      label.className = 'label ' + states[curIdx].cls;
      label.textContent = states[curIdx].label;

      toggle.appendChild(track);
      toggle.appendChild(label);

      toggle.addEventListener('click', async (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        curIdx = (curIdx + 1) % 3;
        const nextState = states[curIdx];
        const halo = track.querySelector('.halo-c');
        if (halo) halo.className = 'halo-c ' + nextState.p;
        label.className = 'label ' + nextState.cls;
        label.textContent = nextState.label;

        const cleanPath = String(filePath || '').replace(/\\/g, '/');
        const tFile = app.vault.getAbstractFileByPath(cleanPath);
        if (tFile) {
          await app.fileManager.processFrontMatter(tFile, (fm) => {
            fm.status = nextState.key;
          });
          new Notice('Updated ' + (fileName || tFile.name) + ' ➔ ' + nextState.label);
        }
      });

      return toggle;
    };

    try {
      const safeCode = code
        .replace(/font-family:\s*'Cormorant Garamond'/g, 'font-family:"Cormorant Garamond"')
        .replace(/dv\.paragraph\('\r?\n([\s\S]*?)\r?\n'\);/g, (_, inner) => `dv.paragraph('${inner.replace(/\r?\n/g, ' ')}');`);
      const fn = new Function('dv', 'app', 'Notice', 'makeAppleToggle', safeCode);
      fn(dv, app, Notice, defaultMakeAppleToggle);

      // Post-process any injected #apple-toggle-css so it never overrides light/dark theme variables
      const injectedStyle = document.getElementById('apple-toggle-css');
      if (injectedStyle) {
        injectedStyle.remove();
      }
    } catch (err) {
      console.error(`DataviewJS execution error in ${currentFilePath}:`, err);
      const errBox = document.createElement('div');
      errBox.className = 'callout';
      errBox.setAttribute('data-callout', 'warning');
      errBox.innerHTML = `<div class="callout-title">DataviewJS Notice</div><div class="callout-content">${escapeHtml(err.message)}</div>`;
      containerEl.appendChild(errBox);
    }
  }
}

function appendCellContent(targetEl, content, runtime, sourcePath) {
  if (content === null || content === undefined) return;
  if (content instanceof Node) {
    targetEl.appendChild(content);
    return;
  }
  if (content instanceof DataviewLink) {
    targetEl.innerHTML = content.toHTML();
    return;
  }
  const str = String(content);
  // Also convert any inline [[wikilinks]] inside Dataview strings
  const withLinks = str.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (_, target, hash, alias) => {
    const resolved = runtime.resolveLinkPath(target, sourcePath);
    const label = alias || target.split('/').pop().replace(/\.md$/i, '');
    return `<a class="internal-link" data-href="${escapeAttr(resolved)}" ${hash ? `data-heading="${escapeAttr(hash)}"` : ''} href="/?note=${encodeURIComponent(resolved)}">${escapeHtml(label)}</a>`;
  });
  targetEl.innerHTML = withLinks;
}
