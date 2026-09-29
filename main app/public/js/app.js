import { VaultRuntime } from './dataview-engine.js';
import { renderObsidianMarkdown, createAppleStatusToggle } from './markdown-engine.js';
import { renderGraphView } from './graph-view.js';
import { renderNotesStudio, renderQuickScratchpad } from './vault-apps.js';

const DEFAULT_BOOKMARKS = [
  { path: '00 Language Hub.md', title: '🏛️ 00 Language Hub' },
  { path: 'Basic English/Basic English Progress.md', title: '🧱 Basic English Progress HUD' },
  { path: 'Advanced english/Advanced English Progress.md', title: '🖋️ Advanced English Progress HUD' },
  { path: 'English vocabulary master/Vocabulary Learning Progress.md', title: '👑 Vocabulary Master Progress HUD' },
  { path: 'Greek roots/Greek Learning Progress.md', title: '🏛️ Greek Roots Progress HUD' },
  { path: 'Latin roots/Latin Learning Progress.md', title: '📜 Latin Roots Progress HUD' },
  { path: 'Philosophy/Philosophy Progress.md', title: '🦉 Philosophy Progress HUD' }
];

const NEST_SECTIONS = [
  {
    id: 'language',
    title: '🏛️ LANGUAGE',
    color: '#D4A359',
    folders: [
      'Basic English',
      'Advanced english',
      'English vocabulary master',
      'Greek roots',
      'Latin roots'
    ]
  },
  {
    id: 'knowledge',
    title: '🧠 KNOWLEDGE',
    color: '#3E6B99',
    folders: [
      'Philosophy'
    ]
  }
];

class ObsidianWebAppController {
  constructor() {
    this.runtime = new VaultRuntime(this);
    this.rawPages = [];
    this.vaultLinks = [];
    this.coreNotes = {};
    this.coreNotesLoaded = false;
    this.noteCache = new Map();
    this.liveSyncAvailable = false;
    this.renderVersion = 0; // bumped when note content/status changes, forcing pane re-renders

    // Persisted local state
    this.statusOverrides = JSON.parse(localStorage.getItem('obsidian_status_overrides') || '{}');
    this.customNotes = JSON.parse(localStorage.getItem('obsidian_custom_notes') || '{}');
    this.bookmarks = JSON.parse(localStorage.getItem('obsidian_bookmarks') || JSON.stringify(DEFAULT_BOOKMARKS));
    this.theme = localStorage.getItem('obsidian_theme') || 'dark';

    // Bi-directional Cloud & Git Sync State
    this.authToken = localStorage.getItem('obsidian_auth_token') || '';
    this.mutationQueue = JSON.parse(localStorage.getItem('obsidian_mutation_queue') || '[]');
    this.gitSyncStatus = null;
    this.isSyncing = false;

    // Native Dual Pane Workspace State (DOpus Study Dual Pane + open-to-side)
    const savedDual = localStorage.getItem('obsidian_dual_pane');
    this.dualPane = savedDual !== null ? savedDual === 'true' : window.innerWidth > 900;
    this.activePane = 'left'; // 'left' | 'right'
    this.leftSplitPercent = Number(localStorage.getItem('obsidian_split_percent')) || 50;

    this.panes = {
      left: {
        tabs: [
          {
            id: 'tab-l-hub',
            type: 'markdown',
            path: '00 Language Hub.md',
            title: '00 Language Hub',
            mode: 'preview',
            pinned: true,
            history: ['00 Language Hub.md'],
            historyIdx: 0
          },
          {
            id: 'tab-l-greek',
            type: 'markdown',
            path: 'Greek roots/01_Root_Dashboards/Dashboard — Greek Roots.md',
            title: 'Dashboard — Greek Roots',
            mode: 'preview',
            pinned: true,
            history: ['Greek roots/01_Root_Dashboards/Dashboard — Greek Roots.md'],
            historyIdx: 0
          }
        ],
        activeTabId: 'tab-l-hub',
        headings: [],
        outgoing: [],
        frontmatter: {},
        markdown: ''
      },
      right: {
        tabs: [
          {
            id: 'tab-r-actin',
            type: 'markdown',
            path: 'Greek roots/Cluster Action/Dashboard — actin/actin.md',
            title: 'actin',
            mode: 'preview',
            pinned: false,
            history: ['Greek roots/Cluster Action/Dashboard — actin/actin.md'],
            historyIdx: 0
          },
          {
            id: 'tab-r-philo',
            type: 'markdown',
            path: 'Philosophy/1. Epistemology/Justified True Belief and Gettier.md',
            title: 'Justified True Belief and Gettier',
            mode: 'preview',
            pinned: false,
            history: ['Philosophy/1. Epistemology/Justified True Belief and Gettier.md'],
            historyIdx: 0
          },
          {
            id: 'tab-r-adv',
            type: 'markdown',
            path: 'Basic English/1. Word Classes/Modifiers/Adverbs.md',
            title: 'Adverbs',
            mode: 'preview',
            pinned: false,
            history: ['Basic English/1. Word Classes/Modifiers/Adverbs.md'],
            historyIdx: 0
          }
        ],
        activeTabId: 'tab-r-actin',
        headings: [],
        outgoing: [],
        frontmatter: {},
        markdown: ''
      }
    };

    this.leftSidebarTab = 'files'; // 'files' | 'search' | 'bookmarks' | 'apps'
    this.rightSidebarTab = 'outline'; // 'outline' | 'backlinks' | 'properties'
    this.leftCollapsed = window.innerWidth <= 900;
    this.rightCollapsed = true;

    this.expandedFolders = new Set(['Basic English', 'Philosophy']);
    this.collapsedNestSections = new Set();
    this.folderTree = null;
    this.hoverTimeout = null;

    // Extended Modern UI State (Phases 1-4)
    this.syncScroll = false;
    this.flashcardMode = { left: false, right: false };
    this.paneHistory = {
      left: ['00 Language Hub.md', 'Greek roots/01_Root_Dashboards/Dashboard — Greek Roots.md'],
      right: ['Greek roots/Cluster Action/Dashboard — actin/actin.md', 'Philosophy/1. Epistemology/Justified True Belief and Gettier.md']
    };
    this.explorerFilter = '';
    this.zenMode = false;
    this.typography = JSON.parse(
      localStorage.getItem('obsidian_typography') ||
      '{"font":"serif","size":16,"lineHeight":1.65,"width":72}'
    );
  }

  /**
   * Unified Authenticated & Offline-Resilient API Fetch Wrapper
   */
  async apiFetch(url, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        const unlocked = await this.promptForAuthPasscode();
        if (unlocked && this.authToken) {
          headers['Authorization'] = `Bearer ${this.authToken}`;
          return fetch(url, { ...options, headers });
        }
      }
      return res;
    } catch (err) {
      if (options.method && options.method !== 'GET') {
        this.queueOfflineMutation(url, options);
      }
      throw err;
    }
  }

  promptForAuthPasscode() {
    return new Promise((resolve) => {
      const existing = document.getElementById('vault-auth-modal');
      if (existing) existing.remove();

      const modal = document.createElement('div');
      modal.id = 'vault-auth-modal';
      modal.className = 'modal-backdrop';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.innerHTML = `
        <div class="prompt-modal" style="max-width: 400px; padding: 26px; border-radius: 12px; background: var(--background-primary); border: 1px solid var(--background-modifier-border); box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center;">
          <div style="font-size: 36px; margin-bottom: 12px;">🔐</div>
          <h2 style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: var(--text-normal);">Vault Authentication</h2>
          <p style="margin: 0 0 18px; font-size: 13px; line-height: 1.5; color: var(--text-muted);">Enter your vault passcode to access, edit, and sync your notes across devices.</p>
          <input id="vault-passcode-input" type="password" placeholder="Enter vault passcode..." style="width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 8px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); color: var(--text-normal); font-size: 14px; margin-bottom: 14px; outline: none;" />
          <div style="display: flex; gap: 10px;">
            <button id="vault-passcode-submit" style="flex: 1; padding: 11px 16px; border-radius: 8px; border: none; background: var(--interactive-accent); color: white; font-weight: 600; cursor: pointer; font-size: 14px;">Unlock Vault</button>
          </div>
          <div id="vault-auth-error" style="color: #EF4444; font-size: 12px; margin-top: 10px; display: none;">Invalid passcode. Please try again.</div>
        </div>
      `;
      document.body.appendChild(modal);

      const input = document.getElementById('vault-passcode-input');
      const submitBtn = document.getElementById('vault-passcode-submit');
      const errorEl = document.getElementById('vault-auth-error');

      const attemptLogin = async () => {
        const pass = input.value.trim();
        if (!pass) return;
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pass })
          });
          if (res.ok) {
            const data = await res.json();
            this.authToken = data.token;
            localStorage.setItem('obsidian_auth_token', this.authToken);
            modal.remove();
            this.showNotice('🔓 Vault unlocked successfully!', 3000);
            resolve(true);
          } else {
            errorEl.style.display = 'block';
            input.select();
          }
        } catch {
          errorEl.textContent = 'Server connection failed';
          errorEl.style.display = 'block';
        }
      };

      submitBtn.onclick = attemptLogin;
      input.onkeydown = (e) => {
        if (e.key === 'Enter') attemptLogin();
      };
      setTimeout(() => input.focus(), 50);
    });
  }

  queueOfflineMutation(url, options) {
    const mutation = {
      id: 'mut_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      url,
      method: options.method || 'POST',
      body: options.body,
      headers: options.headers,
      createdAt: new Date().toISOString()
    };
    this.mutationQueue.push(mutation);
    localStorage.setItem('obsidian_mutation_queue', JSON.stringify(this.mutationQueue));
    this.updateStatusBar();
    this.showNotice(`📶 Offline: Change saved locally (${this.mutationQueue.length} queued to sync)`, 3000);
  }

  async flushMutationQueue() {
    if (!this.mutationQueue || this.mutationQueue.length === 0) return;
    console.log(`🔄 Flushing ${this.mutationQueue.length} queued offline mutations...`);
    const remaining = [];
    for (const item of this.mutationQueue) {
      try {
        const headers = { ...item.headers };
        if (this.authToken) headers['Authorization'] = `Bearer ${this.authToken}`;
        const res = await fetch(item.url, {
          method: item.method,
          headers,
          body: item.body
        });
        if (!res.ok && res.status !== 404 && res.status !== 409) {
          remaining.push(item);
        }
      } catch {
        remaining.push(item);
      }
    }
    const syncedCount = this.mutationQueue.length - remaining.length;
    this.mutationQueue = remaining;
    localStorage.setItem('obsidian_mutation_queue', JSON.stringify(this.mutationQueue));
    this.updateStatusBar();
    if (syncedCount > 0) {
      this.showNotice(`✅ Synced ${syncedCount} offline change(s) to vault!`, 3000);
      this.fetchSyncStatus();
    }
  }

  async fetchSyncStatus() {
    try {
      const res = await this.apiFetch('/api/sync');
      if (res && res.ok) {
        this.gitSyncStatus = await res.json();
        this.updateStatusBar();
      }
    } catch {
      // offline
    }
  }

  async triggerManualSync() {
    if (this.isSyncing) return;
    this.isSyncing = true;
    this.updateStatusBar();
    this.showNotice('🔄 Syncing vault with GitHub remote...', 2500);

    try {
      await this.flushMutationQueue();
      const res = await this.apiFetch('/api/sync', { method: 'POST' });
      if (res && res.ok) {
        const data = await res.json();
        this.gitSyncStatus = data.status || data;
        const pulled = data.pull?.pulled ? ` (+${data.pull.count} pulled)` : '';
        this.showNotice(`✅ Vault synchronized successfully!${pulled}`, 3500);
      } else {
        this.showNotice('⚠️ Git sync check completed.', 3000);
      }
    } catch (err) {
      this.showNotice('⚠️ Sync error: ' + err.message, 4000);
    } finally {
      this.isSyncing = false;
      this.updateStatusBar();
    }
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    if (urlTheme === 'light' || urlTheme === 'dark') {
      this.theme = urlTheme;
    }

    this.applyTheme(this.theme);
    this.applyTypography();
    this.applyDualPaneLayout();
    this.bindGlobalShortcuts();
    this.bindShellUI();
    this.bindDualPaneResizer();
    this.bindTouchGestures();
    this.bindTabDragAndDrop();

    // Bi-directional Git & Offline sync listeners
    window.addEventListener('online', () => {
      this.showNotice('📶 Connection restored. Syncing offline changes...', 3000);
      this.flushMutationQueue();
    });
    setInterval(() => this.fetchSyncStatus(), 60000);

    await this.loadVaultData();
    await this.fetchSyncStatus();
    await this.flushMutationQueue();

    const urlView = params.get('view');
    const urlNote = params.get('note');
    const urlRightNote = params.get('right');
    const hashMatch = window.location.hash.match(/note=([^&]+)/);

    if (urlRightNote) {
      await this.openNote(urlRightNote, { pane: 'right', skipRender: true });
    }

    if (urlView === 'graph') {
      this.openSpecialTab('graph', '🕸️ Knowledge Graph', 'left');
    } else if (urlView === 'studio') {
      this.openSpecialTab('studio', '🚀 Notes Studio', 'left');
    } else if (urlView === 'scratchpad') {
      this.openSpecialTab('scratchpad', '⚡ Quick Scratchpad', 'left');
    } else if (urlNote) {
      await this.openNote(urlNote, { pane: 'left', forceInPlace: true });
    } else if (hashMatch) {
      const requestedPath = decodeURIComponent(hashMatch[1]);
      await this.openNote(requestedPath, { pane: 'left', forceInPlace: true });
    } else {
      await this.renderActiveWorkspace();
    }
  }

  async loadVaultData() {
    const loadingBanner = document.getElementById('workspace-loading-state');
    if (loadingBanner) loadingBanner.textContent = 'Synchronizing 52,066 Vault Notes & Custom Design Tokens...';

    try {
      let idxData = null;
      try {
        const apiRes = await this.apiFetch('/api/vault-index');
        if (apiRes.ok) {
          idxData = await apiRes.json();
          this.liveSyncAvailable = Boolean(idxData.liveSync);
        }
      } catch {
        this.liveSyncAvailable = false;
      }

      if (!idxData) {
        const staticRes = await fetch('/data/vault-index.json');
        idxData = await staticRes.json();
      }

      this.rawPages = idxData.pages || [];
      this.vaultLinks = idxData.links || [];

      for (const customPath of Object.keys(this.customNotes)) {
        if (!this.rawPages.some(p => p.p === customPath)) {
          this.rawPages.push({ p: customPath, s: this.statusOverrides[customPath] || 'unread' });
        }
        this.noteCache.set(customPath, this.customNotes[customPath]);
      }

      this.runtime.hydrateIndex(this.rawPages, this.statusOverrides);
      this.buildFolderTreeStructure();
      this.renderLeftSidebar();
      this.updateStatusBar();
    } catch (err) {
      console.error('Failed to load vault index:', err);
      this.showNotice('Error loading vault index: ' + err.message, 5000);
    }
  }

  applyTheme(theme) {
    this.theme = theme === 'light' ? 'light' : 'dark';
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${this.theme}`);
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('obsidian_theme', this.theme);

    const themeBtn = document.getElementById('ribbon-theme-btn');
    if (themeBtn) {
      themeBtn.title = this.theme === 'dark'
        ? 'Switch to Light Mode (Scandinavian Birch Studio)'
        : 'Switch to Dark Mode (Volcanic Obsidian & Magma)';
    }
  }

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    this.showNotice(
      next === 'light'
        ? '☀️ Light Mode: Scandinavian Birch Studio'
        : '🌋 Dark Mode: Volcanic Obsidian & Magma'
    );
  }

  applyDualPaneLayout() {
    const rootSplit = document.getElementById('workspace-root-split');
    const leftGroup = document.getElementById('pane-group-left');
    const rightGroup = document.getElementById('pane-group-right');
    if (!rootSplit || !leftGroup || !rightGroup) return;

    rootSplit.classList.toggle('is-dual-pane', this.dualPane);
    document.querySelectorAll('.dual-pane-toggle-btn').forEach(btn => {
      btn.classList.toggle('is-active', this.dualPane);
    });

    if (this.dualPane) {
      leftGroup.style.flex = `0 0 ${this.leftSplitPercent}%`;
      rightGroup.style.flex = `1 1 ${100 - this.leftSplitPercent}%`;
    } else {
      leftGroup.style.flex = '1 1 100%';
      if (this.activePane === 'right') {
        this.activePane = 'left';
      }
    }

    this.updateActivePaneVisuals();
  }

  toggleDualPane(forceState) {
    this.dualPane = forceState !== undefined ? Boolean(forceState) : !this.dualPane;
    localStorage.setItem('obsidian_dual_pane', String(this.dualPane));
    this.applyDualPaneLayout();
    this.showNotice(
      this.dualPane
        ? '◫ Native Dual Pane Active (Left Dashboard Lister · Right Study Pane)'
        : '📄 Single Pane View Active'
    );
    this.renderActiveWorkspace();
  }

  applyTypography() {
    const root = document.documentElement;
    const fonts = {
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Helvetica, Arial, sans-serif',
      mono: '"JetBrains Mono", Consolas, "Courier New", monospace'
    };
    root.style.setProperty('--font-text-override', fonts[this.typography.font] || fonts.serif);
    root.style.setProperty('--font-size-reading', `${this.typography.size}px`);
    root.style.setProperty('--line-height-reading', `${this.typography.lineHeight}`);
    root.style.setProperty('--reading-max-width', `${this.typography.width}ch`);

    // Update typography modal labels if present
    const sizeLbl = document.getElementById('typo-font-size-label');
    const heightLbl = document.getElementById('typo-line-height-label');
    const widthLbl = document.getElementById('typo-width-label');
    if (sizeLbl) sizeLbl.textContent = `${this.typography.size}px`;
    if (heightLbl) heightLbl.textContent = `${this.typography.lineHeight}`;
    if (widthLbl) widthLbl.textContent = `${this.typography.width}ch`;

    document.querySelectorAll('.typography-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === this.typography.font);
    });
  }

  toggleZenMode() {
    this.zenMode = !this.zenMode;
    document.body.classList.toggle('zen-mode', this.zenMode);
    this.showNotice(
      this.zenMode
        ? '🧘 Zen Focus Mode Activated (Press F11 to exit)'
        : 'Zen Focus Mode Deactivated'
    );
  }

  toggleSyncScroll() {
    this.syncScroll = !this.syncScroll;
    const btn = document.getElementById('btn-sync-scroll');
    if (btn) {
      btn.classList.toggle('is-synced', this.syncScroll);
    }
    this.showNotice(
      this.syncScroll
        ? '🔗 Dual-Pane Sync Scroll Locked'
        : 'Dual-Pane Sync Scroll Unlocked'
    );
  }

  toggleFlashcardMode(paneId) {
    this.flashcardMode[paneId] = !this.flashcardMode[paneId];
    const btn = document.getElementById(`btn-flashcard-${paneId}`);
    if (btn) {
      btn.classList.toggle('is-flashcard-active', this.flashcardMode[paneId]);
    }
    this.showNotice(
      this.flashcardMode[paneId]
        ? '🧠 Active Recall Flashcard Mode ON (Click blurred cards to reveal)'
        : 'Active Recall Mode OFF'
    );
    // Re-render so recall masks apply to (or clear from) the visible note
    this.renderVersion++;
    this.renderActiveWorkspace();
  }

  updateReadingProgress(paneId) {
    const paneBody = document.getElementById(paneId === 'left' ? 'primary-leaf-body' : 'secondary-leaf-body');
    const progressBar = document.getElementById(`view-header-progress-${paneId}`);
    if (!paneBody || !progressBar) return;
    const maxScroll = paneBody.scrollHeight - paneBody.clientHeight;
    if (maxScroll <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const pct = Math.min(100, Math.max(0, (paneBody.scrollTop / maxScroll) * 100));
    progressBar.style.width = `${pct}%`;
  }

  showContextMenu(x, y, notePath) {
    this.showVaultContextMenu(x, y, { type: 'file', path: notePath });
  }

  showVaultContextMenu(x, y, target) {
    const menu = document.getElementById('custom-context-menu');
    if (!menu) return;

    const isFile = target.type === 'file';
    const isFolder = target.type === 'folder';
    const label = target.path
      ? target.path.split('/').pop()
      : 'vault root';

    let html = '';
    if (isFile) {
      html += `
        <div class="custom-context-item" data-action="open-right">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
          <span>Open in Right Study Pane</span>
        </div>
        <div class="custom-context-item" data-action="open-left">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span>Open in Left Lister</span>
        </div>
        <div class="custom-context-item" data-action="new-tab">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Open in New Tab</span>
        </div>
        <div class="custom-context-sep"></div>
        <div class="custom-context-item" data-action="copy-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l-3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>Copy Wikilink ([[${escapeHtml(label.replace(/\.md$/i, ''))}]])</span>
        </div>
        <div class="custom-context-item" data-action="toggle-bookmark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${this.bookmarks.some(b => b.path === target.path) ? 'Remove Bookmark' : 'Add to Bookmarks'}</span>
        </div>
        <div class="custom-context-sep"></div>
        <div class="custom-context-item" data-action="status-learned"><span>🟢 Mark Mastered</span></div>
        <div class="custom-context-item" data-action="status-learning"><span>🟡 Mark Learning</span></div>
        <div class="custom-context-item" data-action="status-unread"><span>🔴 Mark Unread</span></div>
        <div class="custom-context-sep"></div>
      `;
    }
    if (isFile || isFolder || target.type === 'root') {
      const base = isFolder ? target.path : '';
      html += `
        <div class="custom-context-item" data-action="create-note" data-base="${escapeAttr(base)}">
          <span>📝 New Note${isFolder ? ` in "${escapeHtml(label)}"` : ''}</span>
        </div>
        <div class="custom-context-item" data-action="create-folder" data-base="${escapeAttr(base)}">
          <span>📁 New Folder${isFolder ? ` in "${escapeHtml(label)}"` : ''}</span>
        </div>
      `;
    }
    if (isFile || isFolder) {
      html += `
        <div class="custom-context-sep"></div>
        <div class="custom-context-item" data-action="rename">
          <span>✏️ Rename</span>
        </div>
        <div class="custom-context-item" data-action="delete">
          <span>🗑️ Delete${isFolder ? ' Folder…' : ''}</span>
        </div>
      `;
    }

    menu.innerHTML = html;
    menu.style.display = 'block';
    menu.style.left = `${Math.min(x, window.innerWidth - 230)}px`;
    menu.style.top = `${Math.min(y, window.innerHeight - Math.min(menu.scrollHeight || 300, 380) - 10)}px`;

    const closeHandler = () => {
      menu.style.display = 'none';
      document.removeEventListener('click', closeHandler);
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);

    menu.querySelectorAll('.custom-context-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        const action = item.getAttribute('data-action');

        if (action === 'open-right') {
          if (!this.dualPane) this.toggleDualPane(true);
          this.openNote(target.path, { pane: 'right', forceInPlace: true });
        } else if (action === 'open-left') {
          this.openNote(target.path, { pane: 'left', forceInPlace: true });
        } else if (action === 'new-tab') {
          this.openNote(target.path, { pane: this.activePane, newTab: true });
        } else if (action === 'copy-link') {
          const title = target.path.split('/').pop().replace(/\.md$/i, '');
          navigator.clipboard?.writeText(`[[${title}]]`);
          this.showNotice(`📋 Copied: [[${title}]]`);
        } else if (action === 'toggle-bookmark') {
          const idx = this.bookmarks.findIndex(b => b.path === target.path);
          if (idx >= 0) {
            this.bookmarks.splice(idx, 1);
            this.showNotice(`Removed "${label}" from bookmarks`);
          } else {
            this.bookmarks.push({ path: target.path, title: `📌 ${label}` });
            this.showNotice(`⭐ Bookmarked "${label}"`);
          }
          localStorage.setItem('obsidian_bookmarks', JSON.stringify(this.bookmarks));
          this.renderLeftSidebar();
        } else if (action.startsWith('status-')) {
          const nextStatus = action.replace('status-', '');
          this.updateNoteFrontmatter(target.path, { status: nextStatus }, true);
          this.showNotice(`🎯 Status set to ${nextStatus}: "${label}"`);
        } else if (action === 'create-note') {
          this.createNote(item.getAttribute('data-base') || '');
        } else if (action === 'create-folder') {
          this.createFolder(item.getAttribute('data-base') || '');
        } else if (action === 'rename') {
          const titleEl = document.querySelector(`.nav-file-title[data-path="${CSS.escape(target.path)}"], .nav-folder-title[data-path="${CSS.escape(target.path)}"]`);
          if (titleEl) this.startInlineRename(titleEl, target);
        } else if (action === 'delete') {
          this.deleteVaultItem(target);
        }
      });
    });
  }

  showBreadcrumbDropdown(folderPath, anchorEl, paneId) {
    const menu = document.getElementById('breadcrumb-dropdown-menu');
    if (!menu) return;
    const parts = folderPath.split('/');
    let current = this.folderTree;
    for (const part of parts) {
      if (current && current.folders && current.folders.has(part)) {
        current = current.folders.get(part);
      }
    }
    const files = current?.files ? current.files.slice(0, 50) : [];
    if (!files.length) return;

    menu.innerHTML = `<div style="padding:4px 8px; font-size:10px; font-weight:700; color:var(--web-text-muted); text-transform:uppercase;">${escapeHtml(current.name)} Notes</div>`;
    for (const f of files) {
      const item = document.createElement('div');
      item.className = 'breadcrumb-dropdown-item';
      item.innerHTML = `<span>📄</span><span>${escapeHtml(f.name)}</span>`;
      item.addEventListener('click', () => {
        menu.style.display = 'none';
        this.openNote(f.path, { pane: paneId });
      });
      menu.appendChild(item);
    }

    const rect = anchorEl.getBoundingClientRect();
    menu.style.display = 'block';
    menu.style.left = `${Math.min(rect.left, window.innerWidth - 240)}px`;
    menu.style.top = `${rect.bottom + 4}px`;

    const closeHandler = () => {
      menu.style.display = 'none';
      document.removeEventListener('click', closeHandler);
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  /* ============================================================================
     VAULT FILE OPERATIONS (Obsidian parity: create, rename, delete, drag-move)
     All triggered from context menus / double-click / drag — no extra buttons.
     ============================================================================ */

  get customFolders() {
    this._customFolders = this._customFolders || JSON.parse(localStorage.getItem('obsidian_custom_folders') || '[]');
    return this._customFolders;
  }

  persistCustomFolders() {
    localStorage.setItem('obsidian_custom_folders', JSON.stringify(this.customFolders));
  }

  vaultItemExists(path) {
    if (this.runtime.pagesByPath.has(path)) return true;
    if (this.customFolders.includes(path)) return true;
    if (this.folderTree && this.folderTree.folders.has(path.split('/')[0])) {
      let curr = this.folderTree;
      for (const part of path.split('/')) {
        if (!curr.folders.has(part)) return false;
        curr = curr.folders.get(part);
      }
      if (curr.files.length > 0 || curr.totalCount > 0) return true;
    }
    return this.customFolders.includes(path);
  }

  getUniqueName(folderPath, baseName, ext = '.md') {
    let candidate = folderPath ? `${folderPath}/${baseName}${ext}` : `${baseName}${ext}`;
    let n = 1;
    while (this.vaultItemExists(candidate)) {
      candidate = folderPath ? `${folderPath}/${baseName} ${n}${ext}` : `${baseName} ${n}${ext}`;
      n++;
    }
    return candidate;
  }

  async createNote(folderPath = '') {
    const path = this.getUniqueName(folderPath, 'Untitled');
    try {
      const res = await this.apiFetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content: `# ${path.split('/').pop().replace(/\.md$/i, '')}\n` })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Create failed');
    } catch (e) {
      // Offline: register locally; content is tracked via customNotes on first save
      this.customNotes[path] = `# ${path.split('/').pop().replace(/\.md$/i, '')}\n`;
      localStorage.setItem('obsidian_custom_notes', JSON.stringify(this.customNotes));
    }
    this.rawPages.push({ p: path, s: 'unread' });
    this.buildFolderTreeStructure();
    if (folderPath) {
      this.expandedFolders.add(folderPath);
    }
    this.renderLeftSidebar();
    this.showNotice(`📝 Created ${path.split('/').pop()}`);
    const titleEl = document.querySelector(`.nav-file-title[data-path="${CSS.escape(path)}"]`);
    if (titleEl) this.startInlineRename(titleEl, { type: 'file', path });
  }

  async createFolder(folderPath = '') {
    const path = this.getUniqueName(folderPath, 'Untitled folder', '');
    try {
      const res = await this.apiFetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, isFolder: true })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Create failed');
    } catch {
      // Offline: folder exists client-side only
    }
    if (!this.customFolders.includes(path)) {
      this.customFolders.push(path);
      this.persistCustomFolders();
    }
    this.buildFolderTreeStructure();
    if (folderPath) this.expandedFolders.add(folderPath);
    this.expandedFolders.add(path);
    this.renderLeftSidebar();
    this.showNotice(`📁 Created ${path.split('/').pop()}`);
    const titleEl = document.querySelector(`.nav-folder-title[data-path="${CSS.escape(path)}"]`);
    if (titleEl) this.startInlineRename(titleEl, { type: 'folder', path });
  }

  startInlineRename(titleEl, target) {
    if (titleEl.querySelector('.nav-rename-input')) return;
    const isFile = target.type === 'file';
    const oldName = target.path.split('/').pop();
    const contentEl = titleEl.querySelector('.nav-file-title-content, .nav-folder-title-content');
    if (!contentEl) return;
    const prevHtml = contentEl.innerHTML;

    const input = document.createElement('input');
    input.className = 'nav-rename-input';
    input.value = isFile ? oldName.replace(/\.md$/i, '') : oldName;
    input.spellcheck = false;
    contentEl.innerHTML = '';
    contentEl.appendChild(input);
    input.focus();

    const extIndex = isFile ? oldName.length - 3 : oldName.length;
    input.setSelectionRange(0, extIndex);

    let done = false;
    const finish = async (commit) => {
      if (done) return;
      done = true;
      const newName = input.value.trim();
      contentEl.innerHTML = prevHtml;
      if (!commit || !newName || newName === oldName) return;
      const parent = target.path.includes('/') ? target.path.slice(0, target.path.lastIndexOf('/')) : '';
      const newPath = parent ? `${parent}/${newName}${isFile ? '.md' : ''}` : `${newName}${isFile ? '.md' : ''}`;
      if (newPath === target.path) return;
      try {
        const res = await this.apiFetch('/api/rename', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: target.path, to: newPath })
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Rename failed');
        this.applyLocalRename(target.path, newPath);
        this.showNotice(`✏️ Renamed to ${newName}`);
      } catch (e) {
        this.showNotice('⚠️ Rename failed: ' + e.message, 4000);
      }
    };

    input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') finish(true);
      if (e.key === 'Escape') finish(false);
    });
    input.addEventListener('blur', () => finish(true));
    input.addEventListener('click', (e) => e.stopPropagation());
  }

  /**
   * Apply a rename everywhere in local state (index, tabs, history, bookmarks,
   * caches, custom folders) without a server round-trip.
   */
  applyLocalRename(from, to) {
    const isFolder = !from.endsWith('.md');
    const prefix = from + '/';
    const remap = p => (isFolder ? to + p.slice(from.length) : to);
    const match = p => (isFolder ? p.startsWith(prefix) : p === from);

    for (const page of this.rawPages) {
      if (match(page.p)) page.p = remap(page.p);
    }
    for (const key of Array.from(this.noteCache.keys())) {
      if (match(key)) {
        this.noteCache.set(remap(key), this.noteCache.get(key));
        this.noteCache.delete(key);
      }
    }
    for (const paneId of ['left', 'right']) {
      const pane = this.panes[paneId];
      for (const tab of pane.tabs) {
        if (match(tab.path)) {
          tab.path = remap(tab.path);
          tab.title = tab.path.split('/').pop().replace(/\.md$/i, '');
        }
        tab.history = tab.history.map(h => (match(h) ? remap(h) : h));
      }
      this.paneHistory[paneId] = (this.paneHistory[paneId] || []).map(h => (match(h) ? remap(h) : h));
    }
    for (const bm of this.bookmarks) {
      if (match(bm.path)) bm.path = remap(bm.path);
    }
    localStorage.setItem('obsidian_bookmarks', JSON.stringify(this.bookmarks));
    for (const key of Object.keys(this.customNotes)) {
      if (match(key)) {
        this.customNotes[remap(key)] = this.customNotes[key];
        delete this.customNotes[key];
      }
    }
    localStorage.setItem('obsidian_custom_notes', JSON.stringify(this.customNotes));
    let foldersDirty = false;
    this.customFolders.forEach((f, i) => {
      if (f === from || (isFolder && f.startsWith(prefix))) { this.customFolders[i] = remap(f); foldersDirty = true; }
    });
    if (foldersDirty) this.persistCustomFolders();
    const expanded = new Set();
    this.expandedFolders.forEach(f => expanded.add(f === from || (isFolder && f.startsWith(prefix)) ? remap(f) : f));
    this.expandedFolders.clear();
    expanded.forEach(f => this.expandedFolders.add(f));

    this.buildFolderTreeStructure();
    this.renderLeftSidebar();
    this.renderActiveWorkspace();
  }

  async deleteVaultItem(target) {
    const isFolder = target.type === 'folder';
    const name = target.path.split('/').pop();
    if (isFolder) {
      const count = this.rawPages.filter(p => p.p.startsWith(target.path + '/')).length;
      const ok = window.confirm(
        count > 0
          ? `Delete folder "${name}" and its ${count} note${count === 1 ? '' : 's'}?\n\nThis cannot be undone.`
          : `Delete empty folder "${name}"?`
      );
      if (!ok) return;
    } else {
      if (!window.confirm(`Delete "${name}"?\n\nThis cannot be undone.`)) return;
    }
    try {
      const res = await this.apiFetch(`/api/note?path=${encodeURIComponent(target.path)}${isFolder ? '&type=folder' : ''}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
    } catch (e) {
      this.showNotice('⚠️ Delete failed: ' + e.message, 4000);
      return;
    }
    this.applyLocalDelete(target.path);
    this.showNotice(`🗑️ Deleted ${name}`);
  }

  applyLocalDelete(targetPath) {
    const isFolder = !targetPath.endsWith('.md');
    const prefix = targetPath + '/';
    const match = p => (isFolder ? p.startsWith(prefix) : p === targetPath);

    this.rawPages = this.rawPages.filter(p => !match(p.p));
    for (const key of Array.from(this.noteCache.keys())) {
      if (match(key)) this.noteCache.delete(key);
    }
    for (const paneId of ['left', 'right']) {
      const pane = this.panes[paneId];
      pane.tabs = pane.tabs.filter(t => !(t.type === 'markdown' && match(t.path)));
      if (!pane.tabs.length) {
        pane.tabs.push({
          id: `tab-${paneId}-recovered-${Date.now()}`,
          type: 'markdown',
          path: '00 Language Hub.md',
          title: '00 Language Hub',
          mode: 'preview',
          pinned: paneId === 'left',
          history: ['00 Language Hub.md'],
          historyIdx: 0
        });
      }
      if (!pane.tabs.some(t => t.id === pane.activeTabId)) {
        pane.activeTabId = pane.tabs[0].id;
      }
      this.paneHistory[paneId] = (this.paneHistory[paneId] || []).filter(h => !match(h));
    }
    this.bookmarks = this.bookmarks.filter(b => !match(b.path));
    localStorage.setItem('obsidian_bookmarks', JSON.stringify(this.bookmarks));
    for (const key of Object.keys(this.customNotes)) {
      if (match(key)) delete this.customNotes[key];
    }
    localStorage.setItem('obsidian_custom_notes', JSON.stringify(this.customNotes));
    const keptFolders = this.customFolders.filter(f => !match(f) && f !== targetPath);
    if (keptFolders.length !== this.customFolders.length) {
      this.customFolders.length = 0;
      keptFolders.forEach(f => this.customFolders.push(f));
      this.persistCustomFolders();
    }
    this.expandedFolders.delete(targetPath);

    this.buildFolderTreeStructure();
    this.renderLeftSidebar();
    this.renderActiveWorkspace();
  }

  async moveVaultItem(fromPath, toFolder) {
    const name = fromPath.split('/').pop();
    const toPath = toFolder ? `${toFolder}/${name}` : name;
    if (toPath === fromPath) return;
    if (toFolder.startsWith(fromPath + '/') || toFolder === fromPath) return;
    try {
      const res = await this.apiFetch('/api/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromPath, to: toPath })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Move failed');
      this.applyLocalRename(fromPath, toPath);
      this.showNotice(`📂 Moved to ${toFolder || 'vault root'}`);
    } catch (e) {
      this.showNotice('⚠️ Move failed: ' + e.message, 4000);
    }
  }

  bindTouchGestures() {
    let startX = 0;
    let startY = 0;
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 40) {
          if (startX < 35 && deltaX > 60) {
            // Swipe right from left edge: open left sidebar
            this.toggleLeftSidebar(true);
          } else if (startX > window.innerWidth - 35 && deltaX < -60) {
            // Swipe left from right edge: open right sidebar
            this.toggleRightSidebar(true);
          }
        }
      }
    }, { passive: true });
  }

  bindTabDragAndDrop() {
    // Enable dragging between tab lists
    ['left', 'right'].forEach(paneId => {
      const tabList = document.getElementById(paneId === 'left' ? 'workspace-tab-list-left' : 'workspace-tab-list-right');
      if (!tabList) return;
      tabList.addEventListener('dragover', (e) => {
        e.preventDefault();
        tabList.classList.add('drag-over');
      });
      tabList.addEventListener('dragleave', () => {
        tabList.classList.remove('drag-over');
      });
      tabList.addEventListener('drop', (e) => {
        e.preventDefault();
        tabList.classList.remove('drag-over');
        const tabData = e.dataTransfer.getData('application/json');
        if (!tabData) return;
        try {
          const { tabId, fromPane } = JSON.parse(tabData);
          if (fromPane !== paneId) {
            const fromGroup = this.panes[fromPane];
            const targetGroup = this.panes[paneId];
            const tabIdx = fromGroup.tabs.findIndex(t => t.id === tabId);
            if (tabIdx >= 0) {
              const [movedTab] = fromGroup.tabs.splice(tabIdx, 1);
              targetGroup.tabs.push(movedTab);
              targetGroup.activeTabId = movedTab.id;
              if (fromGroup.activeTabId === tabId && fromGroup.tabs.length > 0) {
                fromGroup.activeTabId = fromGroup.tabs[0].id;
              }
              this.renderActiveWorkspace();
              this.showNotice(`Moved tab "${movedTab.title}" to ${paneId === 'left' ? 'Left Lister' : 'Right Study Pane'}`);
            }
          }
        } catch (_) {}
      });
    });
  }

  setActivePane(paneId) {
    if (paneId !== 'left' && paneId !== 'right') return;
    if (!this.dualPane && paneId === 'right') return;
    if (this.activePane === paneId) return;
    this.activePane = paneId;
    this.updateActivePaneVisuals();
    this.renderRightSidebar();
    const activeTab = this.getActiveTab(this.activePane);
    const paneState = this.panes[this.activePane];
    if (paneState && paneState.markdown) {
      this.updateStatusBar(paneState.markdown);
    }
    this.highlightExplorerActiveFiles();
  }

  updateActivePaneVisuals() {
    const leftGroup = document.getElementById('pane-group-left');
    const rightGroup = document.getElementById('pane-group-right');
    const leftLeaf = document.getElementById('primary-split-leaf');
    const rightLeaf = document.getElementById('secondary-split-leaf');

    const isLeft = !this.dualPane || this.activePane === 'left';
    if (leftGroup) leftGroup.classList.toggle('mod-active', isLeft);
    if (rightGroup) rightGroup.classList.toggle('mod-active', !isLeft && this.dualPane);
    if (leftLeaf) leftLeaf.classList.toggle('mod-active', isLeft);
    if (rightLeaf) rightLeaf.classList.toggle('mod-active', !isLeft && this.dualPane);
  }

  bindDualPaneResizer() {
    const resizer = document.getElementById('dual-pane-resizer');
    const rootSplit = document.getElementById('workspace-root-split');
    const leftGroup = document.getElementById('pane-group-left');
    const rightGroup = document.getElementById('pane-group-right');
    if (!resizer || !rootSplit || !leftGroup || !rightGroup) return;

    let dragging = false;

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      dragging = true;
      resizer.classList.add('is-dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const rect = rootSplit.getBoundingClientRect();
      if (rect.width <= 0) return;
      const rawPct = ((e.clientX - rect.left) / rect.width) * 100;
      this.leftSplitPercent = Math.min(78, Math.max(22, Math.round(rawPct * 10) / 10));
      leftGroup.style.flex = `0 0 ${this.leftSplitPercent}%`;
      rightGroup.style.flex = `1 1 ${100 - this.leftSplitPercent}%`;
    });

    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      resizer.classList.remove('is-dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      localStorage.setItem('obsidian_split_percent', String(this.leftSplitPercent));
    });

    resizer.addEventListener('dblclick', () => {
      this.leftSplitPercent = 50;
      localStorage.setItem('obsidian_split_percent', '50');
      this.applyDualPaneLayout();
      this.showNotice('Reset Dual Pane split to 50% / 50%');
    });
  }

  /**
   * Build hierarchical folder tree from `this.rawPages` for instant virtualized File Explorer rendering
   */
  buildFolderTreeStructure() {
    const root = { name: '', path: '', folders: new Map(), files: [] };

    for (const p of this.rawPages) {
      const parts = p.p.split('/');
      const fileName = parts.pop();
      let curr = root;
      let currPath = '';

      for (const folderName of parts) {
        currPath = currPath ? `${currPath}/${folderName}` : folderName;
        if (!curr.folders.has(folderName)) {
          curr.folders.set(folderName, {
            name: folderName,
            path: currPath,
            folders: new Map(),
            files: [],
            totalCount: 0
          });
        }
        curr = curr.folders.get(folderName);
        curr.totalCount++;
      }

      curr.files.push({
        name: fileName.replace(/\.md$/i, ''),
        path: p.p
      });
    }

    // Merge client-created (possibly empty) folders so they survive in the tree
    for (const customPath of this.customFolders) {
      const parts = customPath.split('/');
      let curr = root;
      let currPath = '';
      for (const folderName of parts) {
        if (!folderName) continue;
        currPath = currPath ? `${currPath}/${folderName}` : folderName;
        if (!curr.folders.has(folderName)) {
          curr.folders.set(folderName, {
            name: folderName,
            path: currPath,
            folders: new Map(),
            files: [],
            totalCount: 0
          });
        }
        curr = curr.folders.get(folderName);
      }
    }

    this.folderTree = root;
  }

  /**
   * Find if a folder has a Folder Note MOC (e.g. `Basic English/Basic English.md` or `Dashboard — punct/Dashboard — punct.md`)
   */
  getFolderNotePath(folderPath) {
    const folderName = folderPath.split('/').pop();
    const candidate = `${folderPath}/${folderName}.md`;
    if (this.runtime.pagesByPath.has(candidate)) return candidate;
    return null;
  }

  renderLeftSidebar() {
    const container = document.getElementById('left-sidebar-content');
    if (!container) return;

    const filterBar = document.getElementById('explorer-filter-container');
    if (filterBar) filterBar.style.display = this.leftSidebarTab === 'files' ? '' : 'none';

    document.querySelectorAll('[data-left-tab]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-left-tab') === this.leftSidebarTab);
    });

    if (this.leftSidebarTab === 'files') {
      this.renderFileExplorerPane(container);
    } else if (this.leftSidebarTab === 'search') {
      this.renderSearchPane(container);
    } else if (this.leftSidebarTab === 'bookmarks') {
      this.renderBookmarksPane(container);
    } else if (this.leftSidebarTab === 'apps') {
      this.renderAppsSidebarPane(container);
    }
  }

  renderFileExplorerPane(container) {
    container.innerHTML = `
      <div class="nav-action-toolbar">
        <button id="btn-new-note" class="nav-toolbar-btn" title="New Note in Studio">➕</button>
        <button id="btn-collapse-all" class="nav-toolbar-btn" title="Collapse All Folders">🗂️</button>
      </div>
      <div id="nav-files-root" class="nav-files-container"></div>
    `;

    const filesRoot = container.querySelector('#nav-files-root');

    container.querySelector('#btn-new-note').addEventListener('click', () => {
      this.openSpecialTab('studio', '🚀 Notes Studio');
    });

    container.querySelector('#btn-collapse-all').addEventListener('click', () => {
      this.expandedFolders.clear();
      this.renderFileTreeNodes(filesRoot, '');
    });

    // Right-click empty explorer space: New Note / New Folder at vault root
    filesRoot.addEventListener('contextmenu', (e) => {
      if (e.target !== filesRoot) return;
      e.preventDefault();
      this.showVaultContextMenu(e.clientX, e.clientY, { type: 'root', path: '' });
    });

    // Drop on empty explorer space moves items back to the vault root
    filesRoot.addEventListener('dragover', (e) => {
      if (!e.dataTransfer.types.includes('application/x-vault-path')) return;
      e.preventDefault();
    });
    filesRoot.addEventListener('drop', (e) => {
      if (e.target !== filesRoot) return;
      e.preventDefault();
      const dragPath = e.dataTransfer.getData('application/x-vault-path');
      if (dragPath && dragPath.includes('/')) {
        this.moveVaultItem(dragPath, '');
      }
    });

    this.renderFileTreeNodes(filesRoot, this.explorerFilter);
  }

  renderFileTreeNodes(rootEl, filterQuery = '') {
    rootEl.innerHTML = '';
    if (!this.folderTree) return;

    if (filterQuery) {
      const matches = [];
      for (const p of this.runtime.allHydratedPages) {
        if (p.file.path.toLowerCase().includes(filterQuery)) {
          matches.push(p);
          if (matches.length >= 80) break;
        }
      }
      for (const p of matches) {
        rootEl.appendChild(this.createFileNavElement({ name: p.file.name, path: p.file.path }, true));
      }
      return;
    }

    // 1. Render top-level files first (e.g. 00 Language Hub.md)
    for (const file of this.folderTree.files) {
      rootEl.appendChild(this.createFileNavElement(file));
    }

    // 2. Render Folder Nest Manager collapsible sections (🏛️ LANGUAGE, 🧠 KNOWLEDGE)
    const placedFolders = new Set();
    for (const sec of NEST_SECTIONS) {
      const secFolders = sec.folders
        .map(fName => this.folderTree.folders.get(fName))
        .filter(Boolean);
      if (!secFolders.length) continue;

      const isCollapsed = this.collapsedNestSections.has(sec.id);
      const headerEl = document.createElement('div');
      headerEl.className = `nest-section-header ${isCollapsed ? 'is-collapsed' : ''}`;
      headerEl.style.setProperty('--nest-text', sec.color);
      headerEl.style.setProperty('--nest-border', `${sec.color}45`);
      headerEl.style.setProperty('--nest-bg', `${sec.color}18`);
      headerEl.style.setProperty('--nest-bg-hover', `${sec.color}28`);

      headerEl.innerHTML = `
        <span class="nest-section-chevron">▼</span>
        <span class="nest-section-title">${escapeHtml(sec.title)}</span>
        <span class="nest-section-badge">${secFolders.length}</span>
      `;

      headerEl.addEventListener('click', () => {
        if (this.collapsedNestSections.has(sec.id)) {
          this.collapsedNestSections.delete(sec.id);
        } else {
          this.collapsedNestSections.add(sec.id);
        }
        this.renderFileTreeNodes(rootEl, '');
      });

      rootEl.appendChild(headerEl);

      for (const folder of secFolders) {
        placedFolders.add(folder.name);
        if (!isCollapsed) {
          rootEl.appendChild(this.createFolderNavElement(folder));
        }
      }
    }

    // 3. Render any remaining top-level folders (e.g. Templates, _assets)
    for (const folder of this.folderTree.folders.values()) {
      if (placedFolders.has(folder.name)) continue;
      rootEl.appendChild(this.createFolderNavElement(folder));
    }
  }

  createFolderNavElement(folderNode) {
    const isExpanded = this.expandedFolders.has(folderNode.path);
    const leftTab = this.getActiveTab('left');
    const rightTab = this.getActiveTab('right');
    const folderNotePath = this.getFolderNotePath(folderNode.path);
    const isFolderActive = folderNotePath && (
      (leftTab && leftTab.path === folderNotePath) ||
      (this.dualPane && rightTab && rightTab.path === folderNotePath)
    );

    const folderEl = document.createElement('div');
    folderEl.className = `nav-folder ${isExpanded ? '' : 'is-collapsed'}`;

    const titleEl = document.createElement('div');
    titleEl.className = `nav-folder-title ${isFolderActive ? 'is-active' : ''}`;
    titleEl.setAttribute('data-path', folderNode.path);

    titleEl.innerHTML = `
      <div class="nav-folder-title-content">${escapeHtml(folderNode.name)}</div>
      ${folderNode.totalCount > 0 ? `<span class="nav-badge-count">${folderNode.totalCount}</span>` : ''}
    `;

    const childrenEl = document.createElement('div');
    childrenEl.className = 'nav-folder-children';

    const populateChildren = () => {
      childrenEl.innerHTML = '';
      const childFolders = Array.from(folderNode.folders.values()).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      );
      for (const cf of childFolders) {
        childrenEl.appendChild(this.createFolderNavElement(cf));
      }

      const filesToShow = folderNode.files.slice(0, 250);
      for (const f of filesToShow) {
        if (f.name === folderNode.name && folderNode.files.length > 1) continue;
        childrenEl.appendChild(this.createFileNavElement(f));
      }
    };

    if (isExpanded) {
      populateChildren();
    }

    titleEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.expandedFolders.has(folderNode.path)) {
        this.expandedFolders.delete(folderNode.path);
        folderEl.classList.add('is-collapsed');
      } else {
        this.expandedFolders.add(folderNode.path);
        folderEl.classList.remove('is-collapsed');
        populateChildren();
      }

      // Folder Notes behavior: open Folder Note MOC in Left Lister (or opposite pane on Ctrl+Click)
      if (folderNotePath) {
        this.openNote(folderNotePath, {
          sourcePane: 'sidebar',
          isFolderNote: true,
          openToSide: e.ctrlKey || e.metaKey
        });
      }
    });

    titleEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.showVaultContextMenu(e.clientX, e.clientY, { type: 'folder', path: folderNode.path });
    });

    titleEl.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.startInlineRename(titleEl, { type: 'folder', path: folderNode.path });
    });

    // Drag & drop: move notes/folders into this folder
    titleEl.addEventListener('dragover', (e) => {
      if (!e.dataTransfer.types.includes('application/x-vault-path')) return;
      e.preventDefault();
      titleEl.classList.add('drag-drop-target');
    });
    titleEl.addEventListener('dragleave', () => {
      titleEl.classList.remove('drag-drop-target');
    });
    titleEl.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      titleEl.classList.remove('drag-drop-target');
      const dragPath = e.dataTransfer.getData('application/x-vault-path');
      if (dragPath && dragPath !== folderNode.path) {
        this.moveVaultItem(dragPath, folderNode.path);
      }
    });

    folderEl.appendChild(titleEl);
    folderEl.appendChild(childrenEl);
    return folderEl;
  }

  createFileNavElement(fileNode, showSubpath = false) {
    const leftTab = this.getActiveTab('left');
    const rightTab = this.getActiveTab('right');
    const isActive =
      (leftTab && leftTab.path === fileNode.path) ||
      (this.dualPane && rightTab && rightTab.path === fileNode.path);
    const page = this.runtime.pagesByPath.get(fileNode.path);
    const status = page && page.status ? page.status : 'unread';

    const fileEl = document.createElement('div');
    fileEl.className = 'nav-file';

    const titleEl = document.createElement('div');
    titleEl.className = `nav-file-title ${isActive ? 'is-active' : ''}`;
    titleEl.setAttribute('data-path', fileNode.path);
    titleEl.draggable = true;

    let clusterBadgeClass = '';
    if (fileNode.path.startsWith('Greek roots/')) clusterBadgeClass = 'cluster-greek';
    else if (fileNode.path.startsWith('Latin roots/')) clusterBadgeClass = 'cluster-latin';
    else if (fileNode.path.startsWith('Philosophy/')) clusterBadgeClass = 'cluster-philo';
    else if (fileNode.path.startsWith('English vocabulary master/')) clusterBadgeClass = 'cluster-vocab';
    const clusterBadge = clusterBadgeClass ? `<span class="cluster-badge-dot ${clusterBadgeClass}"></span>` : '';

    const icon = fileNode.path === '00 Language Hub.md' ? '🏛️ ' : '';
    const subLabel = showSubpath && fileNode.path.includes('/')
      ? `<span style="font-size:10px; color:var(--web-text-muted); margin-left:6px;">${escapeHtml(fileNode.path.slice(0, fileNode.path.lastIndexOf('/')))}</span>`
      : '';

    titleEl.innerHTML = `
      <div class="nav-file-title-content">${clusterBadge}${icon}${escapeHtml(fileNode.name)}${subLabel}</div>
      <span class="nav-status-dot ${escapeAttr(status)}" title="Status: ${escapeAttr(status)}"></span>
    `;

    titleEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHubFile = fileNode.path === '00 Language Hub.md' || fileNode.path.endsWith('Progress.md') || fileNode.path.endsWith('HUD.md');
      this.openNote(fileNode.path, {
        sourcePane: 'sidebar',
        isFolderNote: isHubFile,
        openToSide: e.ctrlKey || e.metaKey
      });
      if (window.innerWidth <= 900) {
        this.toggleLeftSidebar(false);
      }
    });

    titleEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY, fileNode.path);
    });

    titleEl.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.startInlineRename(titleEl, { type: 'file', path: fileNode.path });
    });

    titleEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('application/x-vault-path', fileNode.path);
      e.dataTransfer.effectAllowed = 'move';
    });

    titleEl.addEventListener('auxclick', (e) => {
      if (e.button === 1) {
        e.preventDefault();
        this.openNote(fileNode.path, { openToSide: true });
      }
    });

    fileEl.appendChild(titleEl);
    return fileEl;
  }

  renderSearchPane(container) {
    container.innerHTML = `
      <div style="padding:6px 8px; display:flex; flex-direction:column; gap:8px;">
        <input id="global-search-input" class="nav-filter-input" type="text" placeholder="Search 52,066 notes, roots, words...">
        <div style="display:flex; gap:6px;">
          <select id="global-search-discipline" class="nav-filter-input" style="flex:1;">
            <option value="">All Disciplines</option>
            <option value="Basic English">🧱 Basic English</option>
            <option value="Advanced english">🖋️ Advanced English</option>
            <option value="English vocabulary master">👑 Vocab Master</option>
            <option value="Greek roots">🏛️ Greek Roots</option>
            <option value="Latin roots">📜 Latin Roots</option>
            <option value="Philosophy">🦉 Philosophy</option>
          </select>
          <select id="global-search-status" class="nav-filter-input" style="width:105px;">
            <option value="">All Status</option>
            <option value="learned">🟢 Learned</option>
            <option value="learning">🟡 Studying</option>
            <option value="unread">🔴 Unread</option>
          </select>
        </div>
        <div id="global-search-count" style="font-size:11px; color:var(--web-text-muted); padding:0 2px;"></div>
        <div id="global-search-results" style="display:flex; flex-direction:column; gap:4px;"></div>
      </div>
    `;

    const qInput = container.querySelector('#global-search-input');
    const discSelect = container.querySelector('#global-search-discipline');
    const statusSelect = container.querySelector('#global-search-status');
    const resultsEl = container.querySelector('#global-search-results');
    const countEl = container.querySelector('#global-search-count');

    const runSearch = () => {
      const q = qInput.value.trim().toLowerCase();
      const disc = discSelect.value;
      const stFilter = statusSelect.value;

      const matches = [];
      for (const p of this.runtime.allHydratedPages) {
        if (disc && !p.file.path.startsWith(disc + '/')) continue;
        const st = p.status || 'unread';
        if (stFilter && st !== stFilter) continue;

        let score = 0;
        if (!q) {
          score = 1;
        } else {
          const lowerName = p.file.name.toLowerCase();
          if (lowerName === q) score = 100;
          else if (lowerName.startsWith(q)) score = 80;
          else if (p.file.path.toLowerCase().includes(q)) score = 50;
          else if (this.coreNotes[p.file.path] && this.coreNotes[p.file.path].toLowerCase().includes(q)) score = 25;
        }

        if (score > 0) {
          matches.push({ page: p, score });
          if (!q && matches.length >= 80) break;
          if (matches.length >= 250) break;
        }
      }

      matches.sort((a, b) => b.score - a.score || a.page.file.name.localeCompare(b.page.file.name));
      const top = matches.slice(0, 75);
      countEl.textContent = `Showing ${top.length} matching notes`;
      resultsEl.innerHTML = '';

      for (const { page } of top) {
        const item = document.createElement('div');
        item.className = 'nav-file-title';
        item.style.cssText = 'flex-direction:column; align-items:flex-start; gap:2px; padding:7px 10px; border:1px solid var(--web-border-subtle); background:var(--web-surface-2); border-radius:6px;';
        const st = page.status || 'unread';
        const badge = st === 'learned' ? '🟢' : st === 'learning' ? '🟡' : '🔴';

        item.innerHTML = `
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
            <span style="font-weight:700; color:var(--web-text-primary); font-size:12.5px;">${escapeHtml(page.file.name)}</span>
            <span style="font-size:10px;">${badge}</span>
          </div>
          <div style="font-size:10.5px; color:var(--web-text-muted);">${escapeHtml(page.file.folder || 'Vault Root')}</div>
        `;
        item.addEventListener('click', (e) => {
          this.openNote(page.file.path, { sourcePane: 'sidebar', openToSide: e.ctrlKey || e.metaKey });
          if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
        });
        resultsEl.appendChild(item);
      }
    };

    let searchTimeout = null;
    const debouncedSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(runSearch, 120);
    };
    qInput.addEventListener('input', debouncedSearch);
    discSelect.addEventListener('change', runSearch);
    statusSelect.addEventListener('change', runSearch);
    runSearch();
    setTimeout(() => qInput.focus(), 30);
  }

  renderBookmarksPane(container) {
    container.innerHTML = `
      <div style="padding:6px 8px; display:flex; flex-direction:column; gap:6px;">
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted); padding:4px;">Pinned Vault Hubs & Bookmarks</div>
        <div id="bookmarks-list" style="display:flex; flex-direction:column; gap:4px;"></div>
      </div>
    `;
    const listEl = container.querySelector('#bookmarks-list');
    for (const bm of this.bookmarks) {
      const row = document.createElement('div');
      row.className = 'nav-file-title';
      row.style.cssText = 'background:var(--web-surface-2); border:1px solid var(--web-border-subtle); padding:7px 10px; border-radius:6px;';
      row.innerHTML = `
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600;">${escapeHtml(bm.title)}</span>
      `;
      row.addEventListener('click', (e) => {
        this.openNote(bm.path, { pane: e.ctrlKey || e.metaKey ? 'right' : 'left', forceInPlace: true });
        if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
      });
      listEl.appendChild(row);
    }
  }

  renderAppsSidebarPane(container) {
    container.innerHTML = `
      <div style="padding:8px; display:flex; flex-direction:column; gap:10px;">
        <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted);">Vault Apps & Tools</div>

        <div id="app-card-studio" class="zen-triage-card" style="padding:14px; border-radius:8px; border:1px solid var(--web-border); cursor:pointer;">
          <div style="font-weight:800; font-size:14px; color:var(--web-text-primary);">🚀 Notes Studio</div>
          <div style="font-size:11.5px; color:var(--web-text-muted); margin-top:4px;">Create & template Markdown notes directly into any vault discipline</div>
        </div>

        <div id="app-card-scratch" class="zen-triage-card" style="padding:14px; border-radius:8px; border:1px solid var(--web-border); cursor:pointer;">
          <div style="font-weight:800; font-size:14px; color:var(--web-text-primary);">⚡ Quick Scratchpad</div>
          <div style="font-size:11.5px; color:var(--web-text-muted); margin-top:4px;">Instant thought & sentence scratchpad synced to your vault</div>
        </div>

        <div id="app-card-graph" class="zen-triage-card" style="padding:14px; border-radius:8px; border:1px solid var(--web-border); cursor:pointer;">
          <div style="font-weight:800; font-size:14px; color:var(--web-text-primary);">🕸️ Interactive Graph View</div>
          <div style="font-size:11.5px; color:var(--web-text-muted); margin-top:4px;">Explore semantic connections across all 6 disciplines</div>
        </div>

        <div id="app-card-random" class="zen-triage-card" style="padding:14px; border-radius:8px; border:1px solid var(--web-border); cursor:pointer;">
          <div style="font-weight:800; font-size:14px; color:var(--web-text-primary);">🎲 Random Study Card</div>
          <div style="font-size:11.5px; color:var(--web-text-muted); margin-top:4px;">Jump into a random unread root dashboard or lesson</div>
        </div>
      </div>
    `;

    container.querySelector('#app-card-studio').addEventListener('click', () => {
      this.openSpecialTab('studio', '🚀 Notes Studio');
      if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
    });
    container.querySelector('#app-card-scratch').addEventListener('click', () => {
      this.openSpecialTab('scratchpad', '⚡ Quick Scratchpad');
      if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
    });
    container.querySelector('#app-card-graph').addEventListener('click', () => {
      this.openSpecialTab('graph', '🕸️ Knowledge Graph');
      if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
    });
    container.querySelector('#app-card-random').addEventListener('click', () => {
      this.openRandomStudyNote();
      if (window.innerWidth <= 900) this.toggleLeftSidebar(false);
    });
  }

  getActiveTab(paneId = this.activePane) {
    const group = this.panes[paneId] || this.panes.left;
    return group.tabs.find(t => t.id === group.activeTabId) || group.tabs[0];
  }

  /**
   * Determine if a note path is a Dashboard / Hub / MOC / Cluster vs an individual Lesson / Word Card
   */
  isDashboardOrHubNote(notePath) {
    if (!notePath) return false;
    const base = notePath.split('/').pop().replace(/\.md$/i, '');
    const parent = notePath.split('/').slice(-2, -1)[0] || '';
    if (notePath === '00 Language Hub.md') return true;
    if (base === parent) return true; // Folder Note MOC (e.g. Basic English/Basic English.md, Cluster Action/Cluster Action.md)
    if (base.startsWith('Dashboard — ') || base.startsWith('Word Triage — ') || base.startsWith('Cluster ')) return true;
    if (base.endsWith('Progress') || base.endsWith('HUD')) return true;
    return false;
  }

  /**
   * Native Dual Pane + open-to-side Navigation Router
   */
  resolveTargetPane(resolvedPath, options = {}) {
    if (!this.dualPane) return 'left';
    if (options.pane === 'left' || options.pane === 'right') return options.pane;

    // 1. Ctrl+Click / Cmd+Click (open-to-side trigger: "mod")
    if (options.openToSide) {
      if (options.sourcePane === 'right') return 'left';
      return 'right';
    }

    // 2. Clicked a link inside the Left Pane
    if (options.sourcePane === 'left') {
      const leftTab = this.getActiveTab('left');
      // If Left Tab is pinned (DOpus Study Dual Pane default), study notes open in Right Study Pane!
      // While if clicking a sub-cluster/MOC/dashboard inside a Hub, allow drilling down in Left Pane unless it's a study lesson/word card!
      if (leftTab && leftTab.pinned && !options.forceInPlace) {
        if (!this.isDashboardOrHubNote(resolvedPath)) {
          return 'right';
        }
        // Even for a Root Dashboard clicked from a Cluster or Greek Roots HUD, if user wants to study it on the right or left:
        // In DOpus Study Dual Pane, clicking a Root Dashboard from the Root Index or clicking a word card opens in Right Pane if pinned!
        if (resolvedPath.includes('/Dashboard — ') && leftTab.path.includes('/Dashboard — ')) {
          return 'right';
        }
      }
      return 'left';
    }

    // 3. Clicked a link inside the Right Study Pane
    if (options.sourcePane === 'right') {
      const rightTab = this.getActiveTab('right');
      if (rightTab && rightTab.pinned && !options.forceInPlace) {
        return 'left';
      }
      return 'right';
    }

    // 4. Clicked from Left Sidebar File Explorer
    if (options.sourcePane === 'sidebar') {
      if (options.isFolderNote) {
        return 'left';
      }
      const leftTab = this.getActiveTab('left');
      if (leftTab && leftTab.pinned) {
        return 'right';
      }
      return this.activePane;
    }

    return this.activePane;
  }

  async openNote(notePath, options = {}) {
    const resolvedPath = this.runtime.resolveLinkPath(notePath);
    const title = resolvedPath.split('/').pop().replace(/\.md$/i, '');

    if (options.split) {
      if (!this.dualPane) {
        this.dualPane = true;
        this.applyDualPaneLayout();
      }
      options.pane = 'right';
    }

    const targetPane = this.resolveTargetPane(resolvedPath, options);
    const group = this.panes[targetPane];
    const currentTab = this.getActiveTab(targetPane);

    // Check if note is already open in a tab of targetPane
    const existingTab = group.tabs.find(t => t.type === 'markdown' && t.path === resolvedPath);

    if (existingTab && !options.newTab) {
      group.activeTabId = existingTab.id;
    } else if (options.newTab || options.openToSide || (currentTab && currentTab.pinned && !options.forceInPlace && currentTab.path !== resolvedPath)) {
      const newId = `tab-${targetPane}-${Date.now()}`;
      group.tabs.push({
        id: newId,
        type: 'markdown',
        path: resolvedPath,
        title,
        mode: 'preview',
        pinned: false,
        history: [resolvedPath],
        historyIdx: 0
      });
      group.activeTabId = newId;
    } else {
      let tab = currentTab;
      if (!tab) {
        tab = {
          id: `tab-${targetPane}-main`,
          type: 'markdown',
          path: resolvedPath,
          title,
          mode: 'preview',
          pinned: targetPane === 'left',
          history: [resolvedPath],
          historyIdx: 0
        };
        group.tabs.push(tab);
        group.activeTabId = tab.id;
      } else {
        tab.type = 'markdown';
        if (tab.path !== resolvedPath && !options.fromHistory) {
          tab.history = tab.history.slice(0, tab.historyIdx + 1);
          tab.history.push(resolvedPath);
          tab.historyIdx = tab.history.length - 1;
        }
        tab.path = resolvedPath;
        tab.title = title;
      }
    }

    // Keep focus in Left Lister when Ctrl+Clicking (open-to-side keepFocus: true) unless user clicked directly in Right Pane
    if (!options.openToSide) {
      this.activePane = targetPane;
    }
    this.updateActivePaneVisuals();

    const leftActive = this.getActiveTab('left');
    const urlNotePath = targetPane === 'left' ? resolvedPath : (leftActive?.path || resolvedPath);
    window.history.replaceState(null, '', `/?note=${encodeURIComponent(urlNotePath)}`);

    if (!options.skipRender) {
      await this.renderActiveWorkspace();
    }
  }

  openSpecialTab(type, title, targetPane = this.activePane) {
    const paneId = this.dualPane ? targetPane : 'left';
    const group = this.panes[paneId];
    let existing = group.tabs.find(t => t.type === type);
    if (existing) {
      group.activeTabId = existing.id;
    } else {
      const newId = `tab-${paneId}-${type}-${Date.now()}`;
      group.tabs.push({
        id: newId,
        type,
        path: `@${type}`,
        title,
        mode: 'preview',
        pinned: false,
        history: [`@${type}`],
        historyIdx: 0
      });
      group.activeTabId = newId;
    }
    this.activePane = paneId;
    this.updateActivePaneVisuals();
    window.history.replaceState(null, '', `/?view=${encodeURIComponent(type)}`);
    this.renderActiveWorkspace();
  }

  async fetchNoteMarkdown(notePath) {
    if (this.customNotes[notePath] !== undefined) {
      return this.customNotes[notePath];
    }
    if (this.noteCache.has(notePath)) {
      return this.noteCache.get(notePath);
    }

    try {
      const res = await this.apiFetch(`/api/note?path=${encodeURIComponent(notePath)}`);
      if (res && res.ok) {
        const data = await res.json();
        this.noteCache.set(notePath, data.content);
        return data.content;
      }
    } catch {
      if (!this.coreNotesLoaded) {
        this.coreNotesLoaded = true;
        try {
          const coreRes = await fetch('/data/core-notes.json');
          if (coreRes.ok) {
            this.coreNotes = await coreRes.json();
            for (const [k, v] of Object.entries(this.coreNotes)) {
              this.noteCache.set(k, v);
            }
            if (this.noteCache.has(notePath)) return this.noteCache.get(notePath);
          }
        } catch {
          // ignore
        }
      }
    }

    return this.buildOfflineFallbackMarkdown(notePath);
  }

  buildOfflineFallbackMarkdown(notePath) {
    const page = this.runtime.pagesByPath.get(notePath);
    const name = notePath.split('/').pop().replace(/\.md$/i, '');
    const rootName = page?.latin_root?.fileName || page?.greek_root?.fileName || '';
    const clusterName = page?.cluster?.fileName || '';

    return `---
status: ${page?.status || 'unread'}
---
# ${name}

> [!book] 📖 Lexical Entry
> **Term**: **${name}**
${rootName ? `> **Root Dashboard**: [[${rootName}]]\n` : ''}${clusterName ? `> **Semantic Cluster**: [[${clusterName}]]\n` : ''}
> [!status] 🎯 **Status:** \`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 Learning), option(learned, 🟢 Learned)):status]\`
`;
  }

  async renderActiveWorkspace() {
    this.updateActivePaneVisuals();
    await this.renderPane('left');
    if (this.dualPane) {
      await this.renderPane('right');
    }
    this.highlightExplorerActiveFiles();
    this.renderRightSidebar();
    const activePaneState = this.panes[this.activePane] || this.panes.left;
    this.updateStatusBar(activePaneState.markdown);
    document.body.setAttribute('data-render-ready', 'true');
  }

  async renderPane(paneId) {
    this.renderTabBar(paneId);
    const activeTab = this.getActiveTab(paneId);
    if (!activeTab) return;

    this.renderViewHeader(paneId, activeTab);

    const paneBody = document.getElementById(paneId === 'left' ? 'primary-leaf-body' : 'secondary-leaf-body');
    if (!paneBody) return;

    if (activeTab.type === 'graph') {
      paneBody.dataset.renderKey = '';
      renderGraphView(paneBody, this);
      return;
    }
    if (activeTab.type === 'studio') {
      paneBody.dataset.renderKey = '';
      renderNotesStudio(paneBody, this);
      return;
    }
    if (activeTab.type === 'scratchpad') {
      paneBody.dataset.renderKey = '';
      renderQuickScratchpad(paneBody, this);
      return;
    }

    // Skip re-render when the pane already shows this exact note & mode:
    // switching tabs / re-focusing panes stays instant and keeps scroll position
    const renderKey = `${this.renderVersion}|${activeTab.path}|${activeTab.mode}`;
    if (paneBody.dataset.renderKey === renderKey) {
      this.updateReadingProgress(paneId);
      return;
    }

    await this.renderMarkdownIntoPane(activeTab.path, activeTab.mode, paneBody, paneId);
  }

  highlightExplorerActiveFiles() {
    const leftTab = this.getActiveTab('left');
    const rightTab = this.getActiveTab('right');
    document.querySelectorAll('.nav-file-title').forEach(el => {
      const p = el.getAttribute('data-path');
      const isMatch =
        (leftTab && leftTab.path === p) ||
        (this.dualPane && rightTab && rightTab.path === p);
      el.classList.toggle('is-active', Boolean(isMatch));
    });
  }

  async renderMarkdownIntoPane(notePath, mode, paneEl, paneId = 'left') {
    const markdown = await this.fetchNoteMarkdown(notePath);
    const paneState = this.panes[paneId];
    if (paneState) {
      paneState.markdown = markdown;
    }

    if (mode === 'source') {
      this.renderSourceEditor(notePath, markdown, paneEl, paneId);
      return;
    }

    const rendered = renderObsidianMarkdown(markdown, notePath, this.runtime);
    const page = this.runtime.pagesByPath.get(notePath);
    const cssClasses = Array.isArray(rendered.frontmatter.cssclasses)
      ? rendered.frontmatter.cssclasses
      : (rendered.frontmatter.cssclasses ? [rendered.frontmatter.cssclasses] : (page?.cssclasses || []));

    if (paneState) {
      paneState.headings = rendered.headings;
      paneState.outgoing = rendered.outgoingLinks;
      paneState.frontmatter = rendered.frontmatter;
    }

    const readingView = document.createElement('div');
    readingView.className = `markdown-reading-view ${cssClasses.join(' ')}`;

    const previewView = document.createElement('div');
    previewView.className = 'markdown-preview-view markdown-rendered';

    const sizer = document.createElement('div');
    sizer.className = 'markdown-preview-sizer';
    sizer.innerHTML = rendered.html;

    // Properties Panel replacing raw YAML (collapsed by default, state persisted)
    if (rendered.frontmatter && Object.keys(rendered.frontmatter).length > 0) {
      const propPanel = document.createElement('div');
      propPanel.className = 'note-properties-panel';
      if (localStorage.getItem('obsidian_props_open') === 'true') propPanel.classList.add('is-open');
      const count = Object.keys(rendered.frontmatter).length;
      propPanel.innerHTML = `
        <div class="note-properties-header">
          <span>⚙️ Properties (${count})</span>
          <span class="note-properties-chevron" aria-hidden="true"></span>
        </div>
        <div class="note-properties-collapse">
          <div class="note-properties-grid">
            ${Object.entries(rendered.frontmatter).map(([k, v]) => `
              <div class="note-property-label">${escapeHtml(k)}</div>
              <div class="note-property-value">
                ${Array.isArray(v)
                  ? v.map(item => `<span class="note-property-chip">${escapeHtml(String(item))}</span>`).join('')
                  : `<span class="note-property-chip">${escapeHtml(String(v))}</span>`
                }
              </div>
            `).join('')}
          </div>
        </div>
      `;
      propPanel.querySelector('.note-properties-header').addEventListener('click', () => {
        const open = propPanel.classList.toggle('is-open');
        localStorage.setItem('obsidian_props_open', String(open));
      });
      sizer.prepend(propPanel);
    }

    // Flashcard Active-Recall Masking
    if (this.flashcardMode[paneId]) {
      paneEl.classList.add('flashcard-mode');
      sizer.querySelectorAll('p, li').forEach(el => {
        if (el.textContent.length > 20 && !el.querySelector('.apple-status-toggle') && !el.closest('.note-properties-panel')) {
          el.classList.add('definition-reveal');
          el.title = 'Active Recall: Click to reveal';
          el.addEventListener('click', () => el.classList.toggle('is-revealed'));
        }
      });
    } else {
      paneEl.classList.remove('flashcard-mode');
    }

    previewView.appendChild(sizer);
    readingView.appendChild(previewView);
    paneEl.innerHTML = '';
    paneEl.appendChild(readingView);

    // Scroll Progress & Sync-Scroll handling
    paneEl.onscroll = () => {
      this.hideHoverPreview();
      this.updateReadingProgress(paneId);
      if (this.syncScroll && !this._isSyncing) {
        this._isSyncing = true;
        const otherPaneId = paneId === 'left' ? 'right' : 'left';
        const otherEl = document.getElementById(otherPaneId === 'left' ? 'primary-leaf-body' : 'secondary-leaf-body');
        if (otherEl) {
          const maxSelf = paneEl.scrollHeight - paneEl.clientHeight;
          const maxOther = otherEl.scrollHeight - otherEl.clientHeight;
          if (maxSelf > 0 && maxOther > 0) {
            const pct = paneEl.scrollTop / maxSelf;
            otherEl.scrollTop = pct * maxOther;
            this.updateReadingProgress(otherPaneId);
          }
        }
        setTimeout(() => { this._isSyncing = false; }, 30);
      }
    };

    // Update history trail and progress bar
    if (!this.paneHistory[paneId].includes(notePath)) {
      this.paneHistory[paneId].unshift(notePath);
      if (this.paneHistory[paneId].length > 5) this.paneHistory[paneId].pop();
    }
    this.updateReadingProgress(paneId);

    // 1. Execute all ```dataviewjs blocks in this note
    const dvSlots = sizer.querySelectorAll('.dataviewjs-container');
    dvSlots.forEach(slot => {
      const idx = Number(slot.getAttribute('data-dv-index'));
      const code = rendered.dataviewBlocks[idx];
      if (code) {
        this.runtime.executeDataviewJS(code, slot, notePath);
      }
    });

    // 2. Mount any ```notes-dashboard blocks
    const dashSlots = sizer.querySelectorAll('.notes-dashboard-embed-slot');
    dashSlots.forEach(slot => {
      renderNotesStudio(slot, this);
    });

    // 3. Mount Meta Bind status toggles (`INPUT[inlineSelect(...):status]`)
    const metaMounts = sizer.querySelectorAll('.meta-bind-status-mount');
    metaMounts.forEach(mount => {
      const row = mount.closest('tr');
      const rowLink = row ? row.querySelector('a.internal-link[data-href]') : null;
      const targetPath = rowLink
        ? this.runtime.resolveLinkPath(rowLink.getAttribute('data-href'), notePath)
        : notePath;
      const currentStatus = (this.runtime.pagesByPath.get(targetPath)?.status) || (targetPath === notePath ? rendered.frontmatter.status : null) || 'unread';
      const toggle = createAppleStatusToggle(currentStatus, async (nextStatus) => {
        await this.updateNoteFrontmatter(targetPath, { status: nextStatus }, targetPath === notePath);
      });
      mount.replaceWith(toggle);
    });

    // 4. Bind collapsible Callouts
    sizer.querySelectorAll('.callout.is-collapsible > .callout-title').forEach(titleBar => {
      titleBar.addEventListener('click', () => {
        titleBar.parentElement.classList.toggle('is-collapsed');
      });
    });

    // 5. Bind internal wikilinks & hover previews with pane-aware routing!
    this.bindInternalLinks(sizer, notePath, paneId);

    paneEl.dataset.renderKey = `${this.renderVersion}|${notePath}|${mode}`;
  }

  renderSourceEditor(notePath, markdown, paneEl, paneId = 'left') {
    paneEl.innerHTML = `
      <div class="markdown-editor-container">
        <div class="editor-toolbar">
          <div class="editor-toolbar-group">
            <button class="editor-tool-btn" data-insert="**bold**"><b>B</b></button>
            <button class="editor-tool-btn" data-insert="*italic*"><i>I</i></button>
            <button class="editor-tool-btn" data-insert="==highlight==">🖍️ Highlight</button>
            <button class="editor-tool-btn" data-insert="[[Wikilink]]">🔗 [[Link]]</button>
            <button class="editor-tool-btn" data-insert="\n> [!tip] Key Insight\n> ">💡 Callout</button>
            <button class="editor-tool-btn" data-insert="\n> [!status] 🎯 **Status:** \`INPUT[inlineSelect(option(unread, 🔴 Unread), option(learning, 🟡 Learning), option(learned, 🟢 Learned)):status]\`\n">🎯 Status Toggle</button>
          </div>
          <div class="editor-toolbar-group">
            <button class="editor-save-btn mod-cta" style="padding:5px 14px; font-size:12px;">💾 Save & Preview (Ctrl+S)</button>
          </div>
        </div>
        <textarea class="markdown-textarea" spellcheck="false"></textarea>
      </div>
    `;

    const textarea = paneEl.querySelector('.markdown-textarea');
    textarea.value = markdown;

    paneEl.querySelectorAll('[data-insert]').forEach(btn => {
      btn.addEventListener('click', () => {
        const snippet = btn.getAttribute('data-insert');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.slice(0, start) + snippet + textarea.value.slice(end);
        textarea.focus();
      });
    });

    const saveChanges = async () => {
      await this.saveNoteContent(notePath, textarea.value, false);
      const tab = this.getActiveTab(paneId);
      if (tab) tab.mode = 'preview';
      this.showNotice(`Saved ${notePath.split('/').pop()}`);
      await this.renderActiveWorkspace();
    };

    paneEl.querySelector('.editor-save-btn').addEventListener('click', saveChanges);
    textarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveChanges();
      }
    });
  }

  bindInternalLinks(containerEl, sourcePath, sourcePane = 'left') {
    containerEl.querySelectorAll('a.internal-link').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.hideHoverPreview(); // never leave a stale preview over the opened note
        const rawHref = link.getAttribute('data-href') || link.getAttribute('href') || '';
        const heading = link.getAttribute('data-heading');
        const resolved = this.runtime.resolveLinkPath(rawHref, sourcePath);
        const openToSide = e.ctrlKey || e.metaKey;
        const forceInPlace = e.altKey;

        // Obsidian behavior: clicking an unresolved wikilink creates the note
        if (link.classList.contains('is-unresolved') && !this.runtime.pagesByPath.has(resolved)) {
          const title = resolved.split('/').pop().replace(/\.md$/i, '');
          try {
            const res = await this.apiFetch('/api/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path: resolved, content: `# ${title}\n` })
            });
            if (!res.ok && res.status !== 409) throw new Error((await res.json()).error || 'Create failed');
          } catch {
            this.customNotes[resolved] = `# ${title}\n`;
            localStorage.setItem('obsidian_custom_notes', JSON.stringify(this.customNotes));
          }
          this.rawPages.push({ p: resolved, s: 'unread' });
          this.buildFolderTreeStructure();
          this.renderLeftSidebar();
          this.showNotice(`📝 Created "${title}"`);
        }

        await this.openNote(resolved, {
          sourcePane,
          openToSide,
          forceInPlace,
          newTab: e.shiftKey
        });
        if (heading) {
          const slug = heading.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
          const targetHeading = document.getElementById(slug);
          if (targetHeading) targetHeading.scrollIntoView({ behavior: 'smooth' });
        }
      });

      link.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 900) return;
        clearTimeout(this.hoverTimeout);
        const rawHref = link.getAttribute('data-href') || '';
        if (!rawHref) return;
        const resolved = this.runtime.resolveLinkPath(rawHref, sourcePath);
        const rect = link.getBoundingClientRect();
        this.hoverTimeout = setTimeout(() => {
          this.showHoverPreview(resolved, rect, sourcePane);
        }, 380);
      });

      link.addEventListener('mouseleave', () => {
        clearTimeout(this.hoverTimeout);
      });
    });
  }

  async showHoverPreview(targetPath, anchorRect, sourcePane = 'left') {
    // Cancel any in-flight preview if the pointer moved on to another link
    const token = Symbol();
    this._hoverToken = token;

    let popover = document.getElementById('obsidian-hover-popover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'obsidian-hover-popover';
      popover.className = 'hover-popover';
      popover.addEventListener('mouseleave', () => {
        popover.style.display = 'none';
      });
      document.body.appendChild(popover);
    }

    let md;
    try {
      md = await this.fetchNoteMarkdown(targetPath);
    } catch {
      return;
    }
    if (this._hoverToken !== token) return; // stale hover, a newer link took over

    const rendered = renderObsidianMarkdown(md, targetPath, this.runtime);
    const page = this.runtime.pagesByPath.get(targetPath);
    const status = page?.status || 'unread';

    popover.innerHTML = `
      <div class="hover-preview-header">
        <span class="hover-preview-title">${escapeHtml(targetPath.split('/').pop().replace(/\.md$/i, ''))}</span>
        <span class="hover-preview-status">${status === 'learned' ? '🟢 Learned' : status === 'learning' ? '🟡 Studying' : '🔴 Unread'}</span>
      </div>
      <div class="markdown-rendered markdown-reading-view hover-preview-body">${rendered.html}</div>
    `;
    // Live page preview: no empty widget slots in the popover
    popover.querySelectorAll('.dataviewjs-container, .notes-dashboard-embed-slot, .meta-bind-status-mount').forEach(el => el.remove());

    this.bindInternalLinks(popover, targetPath, sourcePane);

    popover.style.display = 'block';
    const left = Math.min(anchorRect.left, window.innerWidth - 560);
    const top = anchorRect.bottom + 8 + 420 > window.innerHeight
      ? Math.max(12, anchorRect.top - 440)
      : anchorRect.bottom + 8;

    popover.style.left = `${Math.max(12, left)}px`;
    popover.style.top = `${top}px`;
    popover.scrollTop = 0;
  }

  hideHoverPreview() {
    this._hoverToken = null;
    const popover = document.getElementById('obsidian-hover-popover');
    if (popover) popover.style.display = 'none';
  }

  renderTabBar(paneId = 'left') {
    const tabListEl = document.getElementById(paneId === 'left' ? 'workspace-tab-list-left' : 'workspace-tab-list-right');
    if (!tabListEl) return;
    tabListEl.innerHTML = '';

    const group = this.panes[paneId];
    for (const tab of group.tabs) {
      const isActive = tab.id === group.activeTabId;
      const tabEl = document.createElement('div');
      tabEl.className = `workspace-tab-header ${isActive ? 'is-active' : ''}`;
      tabEl.draggable = true;

      const icon = tab.type === 'graph' ? '🕸️' : tab.type === 'studio' ? '🚀' : tab.type === 'scratchpad' ? '⚡' : '📄';
      tabEl.innerHTML = `
        <span style="font-size:12px;">${icon}</span>
        <span class="workspace-tab-header-title">${escapeHtml(tab.title)}</span>
        <span class="workspace-tab-pin ${tab.pinned ? 'is-pinned' : ''}" title="${tab.pinned ? 'Pinned Tab (click to unpin)' : 'Pin Tab'}">📌</span>
        <span class="workspace-tab-close" title="Close tab">×</span>
      `;

      tabEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('application/json', JSON.stringify({ tabId: tab.id, fromPane: paneId }));
      });

      tabEl.addEventListener('click', () => {
        this.activePane = paneId;
        group.activeTabId = tab.id;
        this.renderActiveWorkspace();
      });

      tabEl.addEventListener('auxclick', (e) => {
        if (e.button === 1) { // Middle click closes tab
          e.preventDefault();
          this.closeTab(paneId, tab.id);
        }
      });

      tabEl.querySelector('.workspace-tab-pin').addEventListener('click', (e) => {
        e.stopPropagation();
        tab.pinned = !tab.pinned;
        this.showNotice(tab.pinned ? `📌 Pinned "${tab.title}"` : `Unpinned "${tab.title}"`);
        this.renderPane(paneId);
      });

      tabEl.querySelector('.workspace-tab-close').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(paneId, tab.id);
      });

      tabListEl.appendChild(tabEl);
    }
  }

  closeTab(paneId, tabId) {
    const group = this.panes[paneId];
    if (group.tabs.length <= 1) {
      const fallback = paneId === 'left' ? '00 Language Hub.md' : 'Philosophy/1. Epistemology/Justified True Belief and Gettier.md';
      this.openNote(fallback, { pane: paneId, forceInPlace: true });
      return;
    }
    const idx = group.tabs.findIndex(t => t.id === tabId);
    group.tabs = group.tabs.filter(t => t.id !== tabId);
    if (group.activeTabId === tabId) {
      const nextTab = group.tabs[Math.max(0, idx - 1)];
      group.activeTabId = nextTab.id;
    }
    this.renderActiveWorkspace();
  }

  renderViewHeader(paneId, activeTab) {
    const bcContainer = document.getElementById(`view-breadcrumbs-${paneId}`);
    const pinBtn = document.getElementById(`btn-pin-tab-${paneId}`);
    const modeBtn = document.getElementById(`btn-toggle-edit-mode-${paneId}`);
    const bookmarkBtn = document.getElementById(`btn-bookmark-note-${paneId}`);
    const flashcardBtn = document.getElementById(`btn-flashcard-${paneId}`);

    if (!bcContainer) return;
    bcContainer.innerHTML = '';

    if (pinBtn) {
      pinBtn.classList.toggle('is-active', Boolean(activeTab.pinned));
    }

    if (activeTab.type !== 'markdown') {
      bcContainer.innerHTML = `<span class="breadcrumb-segment current">${escapeHtml(activeTab.title)}</span>`;
      return;
    }

    const parts = activeTab.path.split('/');
    let accum = '';
    parts.forEach((seg, idx) => {
      const isLast = idx === parts.length - 1;
      accum = accum ? `${accum}/${seg}` : seg;
      const folderPath = accum;
      const span = document.createElement('span');
      span.className = `breadcrumb-segment ${isLast ? 'current' : ''}`;
      span.textContent = seg.replace(/\.md$/i, '');
      span.title = isLast ? activeTab.path : `Click to view notes in ${seg}`;

      span.addEventListener('click', (e) => {
        if (!isLast) {
          if (e.shiftKey) {
            const folderNote = this.getFolderNotePath(folderPath);
            if (folderNote) this.openNote(folderNote, { pane: paneId, forceInPlace: true });
          } else {
            this.showBreadcrumbDropdown(folderPath, span, paneId);
          }
        }
      });
      bcContainer.appendChild(span);
      if (!isLast) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb-sep';
        sep.textContent = '›';
        bcContainer.appendChild(sep);
      }
    });

    if (modeBtn) {
      modeBtn.classList.toggle('is-active', activeTab.mode === 'source');
      modeBtn.innerHTML = activeTab.mode === 'source'
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
      modeBtn.title = activeTab.mode === 'source' ? 'Switch to Reading View (Ctrl+E)' : 'Switch to Source Editor (Ctrl+E)';
    }

    if (bookmarkBtn) {
      const isBookmarked = this.bookmarks.some(b => b.path === activeTab.path);
      bookmarkBtn.classList.toggle('is-active', isBookmarked);
      const svg = bookmarkBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isBookmarked ? 'currentColor' : 'none');
    }

    if (flashcardBtn) {
      flashcardBtn.classList.toggle('is-flashcard-active', Boolean(this.flashcardMode[paneId]));
    }

    this.updateReadingProgress(paneId);
  }

  renderRightSidebar() {
    const container = document.getElementById('right-sidebar-content');
    if (!container) return;

    document.querySelectorAll('[data-right-tab]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-right-tab') === this.rightSidebarTab);
    });

    const activePaneId = this.dualPane ? this.activePane : 'left';
    const activeTab = this.getActiveTab(activePaneId);
    const paneState = this.panes[activePaneId];

    if (!activeTab || activeTab.type !== 'markdown') {
      container.innerHTML = `<div style="padding:16px; color:var(--web-text-muted); font-size:12px;">Open a note to view its Outline, Backlinks, and Properties.</div>`;
      return;
    }

    const headings = paneState?.headings || [];
    const outgoing = paneState?.outgoing || [];
    const frontmatter = paneState?.frontmatter || {};

    if (this.rightSidebarTab === 'outline') {
      container.innerHTML = `<div style="padding:6px 8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted);">Outline (${escapeHtml(activeTab.title)})</div>`;
      if (!headings.length) {
        container.innerHTML += `<div style="padding:12px; color:var(--web-text-muted); font-size:12px;">No headings in this note.</div>`;
        return;
      }
      for (const h of headings) {
        const item = document.createElement('div');
        item.className = 'nav-file-title';
        item.style.paddingLeft = `${(h.level - 1) * 12 + 8}px`;
        item.style.fontSize = h.level === 1 ? '13px' : '12px';
        item.style.fontWeight = h.level <= 2 ? '600' : '400';
        item.textContent = h.text;
        item.addEventListener('click', () => {
          const paneBody = document.getElementById(activePaneId === 'left' ? 'primary-leaf-body' : 'secondary-leaf-body');
          const el = paneBody?.querySelector(`#${CSS.escape(h.id)}`) || document.getElementById(h.id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth <= 900) this.toggleRightSidebar(false);
        });
        container.appendChild(item);
      }
    } else if (this.rightSidebarTab === 'backlinks') {
      const targetPath = activeTab.path;
      const incoming = [];
      for (const [src, rawTarget] of this.vaultLinks) {
        const resolved = this.runtime.resolveLinkPath(rawTarget, src);
        if (resolved === targetPath && src !== targetPath) {
          incoming.push(src);
        }
      }
      const uniqueIncoming = Array.from(new Set(incoming));

      container.innerHTML = `
        <div style="padding:6px 8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted);">
          Linked Mentions (${uniqueIncoming.length})
        </div>
      `;
      for (const src of uniqueIncoming) {
        const row = document.createElement('div');
        row.className = 'nav-file-title';
        row.textContent = `← ${src.split('/').pop().replace(/\.md$/i, '')}`;
        row.addEventListener('click', (e) => this.openNote(src, { openToSide: e.ctrlKey || e.metaKey }));
        container.appendChild(row);
      }

      const outHeader = document.createElement('div');
      outHeader.style.cssText = 'padding:14px 8px 6px 8px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted); border-top:1px solid var(--web-border-subtle); margin-top:10px;';
      outHeader.textContent = `Outgoing Links (${outgoing.length})`;
      container.appendChild(outHeader);

      for (const outPath of outgoing) {
        const row = document.createElement('div');
        row.className = 'nav-file-title';
        row.textContent = `→ ${outPath.split('/').pop().replace(/\.md$/i, '')}`;
        row.addEventListener('click', (e) => this.openNote(outPath, { openToSide: e.ctrlKey || e.metaKey }));
        container.appendChild(row);
      }
    } else if (this.rightSidebarTab === 'properties') {
      const page = this.runtime.pagesByPath.get(activeTab.path) || {};
      const fm = { ...frontmatter, status: page.status || frontmatter.status || 'unread' };

      container.innerHTML = `
        <div style="padding:8px; display:flex; flex-direction:column; gap:10px;">
          <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; color:var(--web-text-muted);">Note Properties (${escapeHtml(activePaneId.toUpperCase())} PANE)</div>
          <div style="background:var(--web-surface-2); border:1px solid var(--web-border); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:8px; font-size:12px;">
            <div><strong style="color:var(--web-text-muted);">Path:</strong> <span style="word-break:break-all;">${escapeHtml(activeTab.path)}</span></div>
            <div><strong style="color:var(--web-text-muted);">Status:</strong> <span style="font-weight:700; text-transform:uppercase;">${escapeHtml(fm.status)}</span></div>
            ${page.cluster ? `<div><strong style="color:var(--web-text-muted);">Cluster:</strong> ${page.cluster.toHTML()}</div>` : ''}
            ${page.latin_root ? `<div><strong style="color:var(--web-text-muted);">Latin Root:</strong> ${page.latin_root.toHTML()}</div>` : ''}
            ${page.greek_root ? `<div><strong style="color:var(--web-text-muted);">Greek Root:</strong> ${page.greek_root.toHTML()}</div>` : ''}
            ${fm.tags ? `<div><strong style="color:var(--web-text-muted);">Tags:</strong> ${(Array.isArray(fm.tags) ? fm.tags : [fm.tags]).map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join(' ')}</div>` : ''}
          </div>
        </div>
      `;
      this.bindInternalLinks(container, activeTab.path, activePaneId);
    }
  }

  /**
   * Persist frontmatter updates to both memory, localStorage, and live backend disk file (`D:\Language`)
   */
  async updateNoteFrontmatter(notePath, updates, rerenderNote = false) {
    const resolved = this.runtime.resolveLinkPath(notePath);
    const page = this.runtime.pagesByPath.get(resolved);
    if (page && updates.status !== undefined) {
      page.status = updates.status;
      this.statusOverrides[resolved] = updates.status;
      localStorage.setItem('obsidian_status_overrides', JSON.stringify(this.statusOverrides));
    }

    try {
      await this.apiFetch('/api/frontmatter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: resolved, updates })
      });
    } catch {
      // Handled by apiFetch offline mutation queue
    }

    const fileTitleEl = document.querySelector(`.nav-file-title[data-path="${CSS.escape(resolved)}"] .nav-status-dot`);
    if (fileTitleEl && updates.status) {
      fileTitleEl.className = `nav-status-dot ${updates.status}`;
    }

    this.updateStatusBar();
    this.showNotice(`${resolved.split('/').pop().replace(/\.md$/i, '')} ➔ ${updates.status}`);

    // Re-render both panes so any open Dashboard/HUD in the Left Pane immediately updates its progress bars & Ensō ring when a word/lesson is toggled in the Right Study Pane!
    this.renderVersion++;
    if (rerenderNote || this.dualPane) {
      await this.renderActiveWorkspace();
    }
  }

  async saveNoteContent(notePath, content, append = false) {
    const resolved = notePath.replace(/\\/g, '/').replace(/^\/+/, '');
    this.customNotes[resolved] = content;
    localStorage.setItem('obsidian_custom_notes', JSON.stringify(this.customNotes));
    this.noteCache.set(resolved, content);
    this.renderVersion++;

    try {
      await this.apiFetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: resolved, content, append })
      });
    } catch {
      // Handled by apiFetch offline mutation queue
    }
  }

  updateStatusBar(activeMarkdown = '') {
    let learned = 0;
    let learning = 0;
    for (const p of this.runtime.allHydratedPages) {
      if (p.status === 'learned') learned++;
      else if (p.status === 'learning') learning++;
    }

    const syncEl = document.getElementById('status-sync-indicator');
    const masteryEl = document.getElementById('status-mastery-summary');
    const wordCountEl = document.getElementById('status-word-count');

    if (syncEl) {
      syncEl.style.cursor = 'pointer';
      syncEl.title = 'Click to trigger immediate bi-directional Git & Cloud Sync';

      if (this.isSyncing) {
        syncEl.innerHTML = `🔄 Syncing with Git...`;
      } else if (this.mutationQueue && this.mutationQueue.length > 0) {
        syncEl.innerHTML = `🟡 Offline (${this.mutationQueue.length} queued to sync) · Click to Retry`;
      } else if (this.gitSyncStatus && this.gitSyncStatus.enabled) {
        const branch = this.gitSyncStatus.branch || 'main';
        const timeStr = this.gitSyncStatus.lastSyncedAt
          ? new Date(this.gitSyncStatus.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'ready';
        syncEl.innerHTML = `🟢 Git Synced (${branch} · ${timeStr}) · ${this.dualPane ? '◫ Dual' : '📄 Single'}`;
      } else {
        syncEl.innerHTML = this.liveSyncAvailable
          ? `🟢 Live Vault Sync · ${this.dualPane ? '◫ Dual Pane' : '📄 Single Pane'}`
          : `💾 Local Vault Mode · ${this.dualPane ? '◫ Dual Pane' : '📄 Single Pane'}`;
      }
    }
    if (masteryEl) {
      masteryEl.innerHTML = `🟢 ${learned} Learned · 🟡 ${learning} Studying · 📚 ${this.runtime.allHydratedPages.length.toLocaleString()} Notes`;
    }
    if (wordCountEl && activeMarkdown) {
      const words = activeMarkdown.trim() ? activeMarkdown.trim().split(/\s+/).length : 0;
      const readMin = Math.max(1, Math.ceil(words / 220));
      wordCountEl.textContent = `${words.toLocaleString()} words · ${readMin} min read`;
    }
  }

  openRandomStudyNote() {
    const candidates = this.runtime.allHydratedPages.where(p =>
      (p.type === 'root_dashboard' || p.file.path.startsWith('Basic English/') || p.file.path.startsWith('Advanced english/') || p.file.path.startsWith('Philosophy/') || p.file.path.startsWith('English vocabulary master/')) &&
      p.status !== 'learned'
    );
    if (candidates.length) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      this.openNote(pick.file.path, { pane: this.dualPane ? 'right' : 'left' });
      this.showNotice(`🎲 Random Study Note: ${pick.file.name}`);
    }
  }

  openQuickSwitcherModal(mode = 'switcher') {
    const modal = document.getElementById('global-modal-backdrop');
    const input = document.getElementById('modal-prompt-input');
    const results = document.getElementById('modal-prompt-results');
    if (!modal || !input || !results) return;

    modal.style.display = 'flex';
    input.value = '';
    input.placeholder = mode === 'commands'
      ? 'Type a command (e.g. Toggle Dual Pane, Toggle Theme, Open Graph)...'
      : 'Quick Switcher: Jump to any note (Enter = Active Pane, Ctrl+Enter = Other Pane)...';

    const commands = [
      { title: '◫ Toggle Native Dual Pane View (DOpus Study Split)', shortcut: 'Ctrl+\\', action: () => this.toggleDualPane() },
      { title: '🧘 Toggle Zen Reading Focus Mode', shortcut: 'F11', action: () => this.toggleZenMode() },
      { title: '🔗 Toggle Dual-Pane Sync Scroll Lock', shortcut: 'Ctrl+Shift+S', action: () => this.toggleSyncScroll() },
      { title: '🧠 Toggle Active Recall Flashcard Mode', shortcut: 'Ctrl+Shift+F', action: () => this.toggleFlashcardMode(this.activePane) },
      { title: '🔤 Typography & Reading Appearance Settings', shortcut: 'Ctrl+,', action: () => {
        const modal = document.getElementById('typography-modal-backdrop');
        if (modal) modal.style.display = 'flex';
      }},
      { title: '🏛️ Open 00 Language Hub in Left Dashboard Pane', action: () => this.openNote('00 Language Hub.md', { pane: 'left', forceInPlace: true }) },
      { title: '🌓 Toggle Light / Dark Theme (Scandinavian Birch ⇄ Volcanic Obsidian)', action: () => this.toggleTheme() },
      { title: '🕸️ Open Interactive Knowledge Graph View', action: () => this.openSpecialTab('graph', '🕸️ Knowledge Graph') },
      { title: '🚀 Open Notes Creation Studio', action: () => this.openSpecialTab('studio', '🚀 Notes Studio') },
      { title: '⚡ Open Quick Study Scratchpad', action: () => this.openSpecialTab('scratchpad', '⚡ Quick Scratchpad') },
      { title: '🎲 Jump to Random Unread Study Note (in Right Study Pane)', action: () => this.openRandomStudyNote() },
      { title: '🧱 Open Basic English Progress HUD (Left Pane)', action: () => this.openNote('Basic English/Basic English Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '🖋️ Open Advanced English Progress HUD (Left Pane)', action: () => this.openNote('Advanced english/Advanced English Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '👑 Open Vocabulary Master Progress HUD (Left Pane)', action: () => this.openNote('English vocabulary master/Vocabulary Learning Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '🏛️ Open Greek Roots Progress HUD (Left Pane)', action: () => this.openNote('Greek roots/Greek Learning Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '📜 Open Latin Roots Progress HUD (Left Pane)', action: () => this.openNote('Latin roots/Latin Learning Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '🦉 Open Philosophy Progress HUD (Left Pane)', action: () => this.openNote('Philosophy/Philosophy Progress.md', { pane: 'left', forceInPlace: true }) },
      { title: '✏️ Toggle Reading / Source Editor Mode', shortcut: 'Ctrl+E', action: () => this.toggleEditMode(this.activePane) }
    ];

    const renderList = () => {
      const q = input.value.trim().toLowerCase();
      results.innerHTML = '';

      if (mode === 'commands') {
        const filtered = commands.filter(c => !q || c.title.toLowerCase().includes(q));
        for (const cmd of filtered) {
          const row = document.createElement('div');
          row.className = 'prompt-item';
          const kbdBadge = cmd.shortcut ? `<span class="prompt-result-keybadge"><kbd>${escapeHtml(cmd.shortcut)}</kbd></span>` : '';
          row.innerHTML = `<span style="font-weight:600;">${escapeHtml(cmd.title)}</span>${kbdBadge}`;
          row.addEventListener('click', () => {
            modal.style.display = 'none';
            cmd.action();
          });
          results.appendChild(row);
        }
        return;
      }

      const matches = [];
      for (const p of this.runtime.allHydratedPages) {
        if (!q) {
          if (p.file.path.split('/').length <= 2 || p.file.path.startsWith('Philosophy/')) matches.push({ p, score: 1 });
          if (matches.length >= 35) break;
        } else {
          const ln = p.file.name.toLowerCase();
          let score = 0;
          if (ln === q) score = 100;
          else if (ln.startsWith(q)) score = 80;
          else if (p.file.path.toLowerCase().includes(q)) score = 40;
          if (score > 0) {
            matches.push({ p, score });
            if (matches.length >= 120) break;
          }
        }
      }

      matches.sort((a, b) => b.score - a.score || a.p.file.name.localeCompare(b.p.file.name));
      for (const { p } of matches.slice(0, 40)) {
        const row = document.createElement('div');
        row.className = 'prompt-item';
        const st = p.status === 'learned' ? '🟢' : p.status === 'learning' ? '🟡' : '🔴';
        row.innerHTML = `
          <div>
            <div style="font-weight:700; color:var(--web-text-primary);">${escapeHtml(p.file.name)}</div>
            <div style="font-size:11px; color:var(--web-text-muted);">${escapeHtml(p.file.folder || 'Vault Root')}</div>
          </div>
          <span style="font-size:12px;">${st}</span>
        `;
        row.addEventListener('click', (e) => {
          modal.style.display = 'none';
          this.openNote(p.file.path, { openToSide: e.ctrlKey || e.metaKey });
        });
        results.appendChild(row);
      }
    };

    input.oninput = renderList;
    input.onkeydown = (e) => {
      if (e.key === 'Escape') modal.style.display = 'none';
      if (e.key === 'Enter') {
        const first = results.querySelector('.prompt-item');
        if (first) {
          first.dispatchEvent(new MouseEvent('click', { ctrlKey: e.ctrlKey, metaKey: e.metaKey }));
        }
      }
    };

    renderList();
    setTimeout(() => input.focus(), 20);
  }

  toggleLeftSidebar(forceState) {
    this.leftCollapsed = forceState !== undefined ? !forceState : !this.leftCollapsed;
    const leftSplit = document.getElementById('left-sidebar-split');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (leftSplit) leftSplit.classList.toggle('is-collapsed', this.leftCollapsed);
    if (backdrop && window.innerWidth <= 900) {
      backdrop.classList.toggle('is-open', !this.leftCollapsed || !this.rightCollapsed);
    }
  }

  toggleRightSidebar(forceState) {
    this.rightCollapsed = forceState !== undefined ? !forceState : !this.rightCollapsed;
    const rightSplit = document.getElementById('right-sidebar-split');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (rightSplit) rightSplit.classList.toggle('is-collapsed', this.rightCollapsed);
    if (!this.rightCollapsed) this.renderRightSidebar();
    if (backdrop && window.innerWidth <= 900) {
      backdrop.classList.toggle('is-open', !this.leftCollapsed || !this.rightCollapsed);
    }
  }

  toggleEditMode(paneId = this.activePane) {
    const tab = this.getActiveTab(paneId);
    if (!tab || tab.type !== 'markdown') return;
    tab.mode = tab.mode === 'source' ? 'preview' : 'source';
    this.renderPane(paneId);
  }

  toggleBookmark(paneId = this.activePane) {
    const tab = this.getActiveTab(paneId);
    if (!tab || tab.type !== 'markdown') return;
    const idx = this.bookmarks.findIndex(b => b.path === tab.path);
    if (idx !== -1) {
      this.bookmarks.splice(idx, 1);
      this.showNotice('Removed bookmark');
    } else {
      this.bookmarks.push({ path: tab.path, title: `📌 ${tab.title}` });
      this.showNotice('Bookmarked note');
    }
    localStorage.setItem('obsidian_bookmarks', JSON.stringify(this.bookmarks));
    this.renderViewHeader(paneId, tab);
    if (this.leftSidebarTab === 'bookmarks') this.renderLeftSidebar();
  }

  navigatePaneHistory(paneId, delta) {
    const tab = this.getActiveTab(paneId);
    if (!tab) return;
    const nextIdx = tab.historyIdx + delta;
    if (nextIdx >= 0 && nextIdx < tab.history.length) {
      tab.historyIdx = nextIdx;
      this.openNote(tab.history[tab.historyIdx], { pane: paneId, fromHistory: true, forceInPlace: true });
    }
  }

  showNotice(message, duration = 2600) {
    const container = document.getElementById('notice-toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'notice-toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }

  bindGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        this.openQuickSwitcherModal('switcher');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.openQuickSwitcherModal('commands');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.toggleEditMode(this.activePane);
      } else if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault();
        this.toggleDualPane();
      } else if (e.key === 'F11') {
        e.preventDefault();
        this.toggleZenMode();
      }
    });
  }

  filterExplorer(query) {
    this.explorerFilter = query.trim().toLowerCase();
    const filesRoot = document.getElementById('nav-files-root');
    if (!filesRoot) return;
    this.renderFileTreeNodes(filesRoot, this.explorerFilter);
  }

  bindShellUI() {
    // Pane focus tracking
    document.getElementById('pane-group-left')?.addEventListener('mousedown', () => this.setActivePane('left'));
    document.getElementById('pane-group-right')?.addEventListener('mousedown', () => this.setActivePane('right'));

    // Ribbon buttons
    document.getElementById('ribbon-home-btn')?.addEventListener('click', () => this.openNote('00 Language Hub.md', { pane: 'left', forceInPlace: true }));
    document.getElementById('ribbon-switcher-btn')?.addEventListener('click', () => this.openQuickSwitcherModal('switcher'));
    document.getElementById('ribbon-commands-btn')?.addEventListener('click', () => this.openQuickSwitcherModal('commands'));
    document.getElementById('ribbon-graph-btn')?.addEventListener('click', () => this.openSpecialTab('graph', '🕸️ Knowledge Graph'));
    document.getElementById('ribbon-studio-btn')?.addEventListener('click', () => this.openSpecialTab('studio', '🚀 Notes Studio'));
    document.getElementById('ribbon-scratch-btn')?.addEventListener('click', () => this.openSpecialTab('scratchpad', '⚡ Quick Scratchpad'));
    document.getElementById('ribbon-random-btn')?.addEventListener('click', () => this.openRandomStudyNote());
    document.getElementById('ribbon-zen-btn')?.addEventListener('click', () => this.toggleZenMode());
    document.getElementById('ribbon-typography-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('typography-modal-backdrop');
      if (modal) modal.style.display = 'flex';
    });
    document.getElementById('ribbon-theme-btn')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('ribbon-sync-btn')?.addEventListener('click', () => this.triggerManualSync());
    document.getElementById('status-sync-indicator')?.addEventListener('click', () => this.triggerManualSync());
    document.getElementById('mnav-sync')?.addEventListener('click', () => this.triggerManualSync());

    // Explorer Quick Filter
    const filterInput = document.getElementById('explorer-filter-input');
    const filterClear = document.getElementById('explorer-filter-clear');
    if (filterInput) {
      let filterTimeout = null;
      filterInput.addEventListener('input', () => {
        const val = filterInput.value;
        if (filterClear) filterClear.style.display = val ? 'inline-block' : 'none';
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => this.filterExplorer(val), 90);
      });
    }
    if (filterClear) {
      filterClear.addEventListener('click', () => {
        if (filterInput) {
          filterInput.value = '';
          filterClear.style.display = 'none';
          this.filterExplorer('');
        }
      });
    }

    // Typography Settings Modal
    document.getElementById('typography-modal-close')?.addEventListener('click', () => {
      const modal = document.getElementById('typography-modal-backdrop');
      if (modal) modal.style.display = 'none';
    });
    document.getElementById('typography-modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'typography-modal-backdrop') {
        e.target.style.display = 'none';
      }
    });

    document.querySelectorAll('.typography-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.typography.font = btn.getAttribute('data-font');
        localStorage.setItem('obsidian_typography', JSON.stringify(this.typography));
        this.applyTypography();
      });
    });

    const sizeSlider = document.getElementById('typo-font-size-slider');
    if (sizeSlider) {
      sizeSlider.value = this.typography.size;
      sizeSlider.addEventListener('input', (e) => {
        this.typography.size = Number(e.target.value);
        localStorage.setItem('obsidian_typography', JSON.stringify(this.typography));
        this.applyTypography();
      });
    }

    const heightSlider = document.getElementById('typo-line-height-slider');
    if (heightSlider) {
      heightSlider.value = this.typography.lineHeight;
      heightSlider.addEventListener('input', (e) => {
        this.typography.lineHeight = Number(e.target.value);
        localStorage.setItem('obsidian_typography', JSON.stringify(this.typography));
        this.applyTypography();
      });
    }

    const widthSlider = document.getElementById('typo-width-slider');
    if (widthSlider) {
      widthSlider.value = this.typography.width;
      widthSlider.addEventListener('input', (e) => {
        this.typography.width = Number(e.target.value);
        localStorage.setItem('obsidian_typography', JSON.stringify(this.typography));
        this.applyTypography();
      });
    }

    // Left & Right Sidebar toggles
    document.getElementById('btn-toggle-left-sidebar')?.addEventListener('click', () => this.toggleLeftSidebar());
    document.getElementById('btn-toggle-right-sidebar')?.addEventListener('click', () => this.toggleRightSidebar());
    document.getElementById('btn-toggle-right-sidebar-left')?.addEventListener('click', () => this.toggleRightSidebar());

    document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', () => {
      this.toggleLeftSidebar(false);
      this.toggleRightSidebar(false);
    });

    // Left Sidebar Tab switches
    document.querySelectorAll('[data-left-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.leftSidebarTab = btn.getAttribute('data-left-tab');
        this.renderLeftSidebar();
      });
    });

    // Right Sidebar Tab switches
    document.querySelectorAll('[data-right-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.rightSidebarTab = btn.getAttribute('data-right-tab');
        this.renderRightSidebar();
      });
    });

    // Dual Pane Sync-Scroll button
    document.getElementById('btn-sync-scroll')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleSyncScroll();
    });

    // Left Pane Header & Tab actions
    document.getElementById('btn-new-tab-left')?.addEventListener('click', () => {
      this.openNote('00 Language Hub.md', { pane: 'left', newTab: true });
    });
    document.getElementById('btn-nav-back-left')?.addEventListener('click', () => this.navigatePaneHistory('left', -1));
    document.getElementById('btn-nav-forward-left')?.addEventListener('click', () => this.navigatePaneHistory('left', 1));
    document.getElementById('btn-pin-tab-left')?.addEventListener('click', () => {
      const tab = this.getActiveTab('left');
      if (tab) {
        tab.pinned = !tab.pinned;
        this.showNotice(tab.pinned ? `📌 Pinned "${tab.title}" in Left Lister` : `Unpinned "${tab.title}"`);
        this.renderPane('left');
      }
    });
    document.getElementById('btn-bookmark-note-left')?.addEventListener('click', () => this.toggleBookmark('left'));
    document.getElementById('btn-flashcard-left')?.addEventListener('click', () => this.toggleFlashcardMode('left'));
    document.getElementById('btn-toggle-edit-mode-left')?.addEventListener('click', () => this.toggleEditMode('left'));

    // Right Pane Header & Tab actions
    document.getElementById('btn-new-tab-right')?.addEventListener('click', () => {
      this.openNote('Philosophy/1. Epistemology/Justified True Belief and Gettier.md', { pane: 'right', newTab: true });
    });
    document.getElementById('btn-nav-back-right')?.addEventListener('click', () => this.navigatePaneHistory('right', -1));
    document.getElementById('btn-nav-forward-right')?.addEventListener('click', () => this.navigatePaneHistory('right', 1));
    document.getElementById('btn-pin-tab-right')?.addEventListener('click', () => {
      const tab = this.getActiveTab('right');
      if (tab) {
        tab.pinned = !tab.pinned;
        this.showNotice(tab.pinned ? `📌 Pinned "${tab.title}" in Right Study Pane` : `Unpinned "${tab.title}"`);
        this.renderPane('right');
      }
    });
    document.getElementById('btn-bookmark-note-right')?.addEventListener('click', () => this.toggleBookmark('right'));
    document.getElementById('btn-flashcard-right')?.addEventListener('click', () => this.toggleFlashcardMode('right'));
    document.getElementById('btn-toggle-edit-mode-right')?.addEventListener('click', () => this.toggleEditMode('right'));

    // Modal backdrop close
    document.getElementById('global-modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'global-modal-backdrop') {
        e.target.style.display = 'none';
      }
    });

    // Mobile Bottom Nav
    document.getElementById('mnav-hub')?.addEventListener('click', () => this.openNote('00 Language Hub.md', { pane: 'left', forceInPlace: true }));
    document.getElementById('mnav-files')?.addEventListener('click', () => {
      this.leftSidebarTab = 'files';
      this.renderLeftSidebar();
      this.toggleLeftSidebar(true);
    });
    document.getElementById('mnav-search')?.addEventListener('click', () => this.openQuickSwitcherModal('switcher'));
    document.getElementById('mnav-graph')?.addEventListener('click', () => this.openSpecialTab('graph', '🕸️ Knowledge Graph'));
    document.getElementById('mnav-studio')?.addEventListener('click', () => this.openSpecialTab('studio', '🚀 Notes Studio'));
    document.getElementById('mnav-theme')?.addEventListener('click', () => this.toggleTheme());
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

window.addEventListener('DOMContentLoaded', () => {
  const app = new ObsidianWebAppController();
  window.obsidianWebApp = app;
  app.init();
});
