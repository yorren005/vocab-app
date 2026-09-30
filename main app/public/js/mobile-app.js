/**
 * Obsidian Vocab — Mobile Native Application Engine
 * Optimized for Pure Vocabulary Mastery (Greek Roots, Latin Roots, English Vocabulary Master).
 * Features:
 * - 4-Tab Bottom Bar: Home Hub, Word Cards (TikTok-Style Vertical Feed), Daily Random Word, Settings HUD
 * - Full-Stack Subpage Navigation with Horizontal Swipe & Breadcrumbs on Home Tab
 * - DataviewJS Execution for Live Morphological Dashboards & Word Tables
 * - TikTok-Style Vertical Snap/Swipe Feed for 49,000+ Individual Vocabulary Words
 * - SpeechSynthesis Audio Pronunciation Engine
 * - 3-State Reactive Tracking System (🔴 Unread, 🟡 Studying, 🟢 Learned)
 * - Offline-First Native Architecture (Capacitor & Android APK Ready)
 */

import { renderObsidianMarkdown, extractFrontmatterAndBody, createAppleStatusToggle } from './markdown-engine.js';
import { VaultRuntime } from './dataview-engine.js';

class MobileVocabApp {
  constructor() {
    this.activeTab = 'home'; // 'home' | 'cards' | 'daily' | 'settings'

    // Data Stores (Strictly Pure Vocabulary: Greek Roots, Latin Roots, Vocab Master)
    this.vaultIndex = { pages: [], totalNotes: 0 };
    this.coreNotes = {};
    this.statusDb = {};
    this.allWordCards = [];
    this.filteredCards = [];

    // Home Navigation Stack (Subpages, Dashboards, Clusters, Reference)
    this.homeStack = []; // Stack of { path, title, isHomeRoot }
    this.currentHomeNote = null;

    // Word Cards State (TikTok-Style Vertical Swipable Feed)
    this.feedWordIndex = 0;
    this.returnToFeedIndex = 0;
    this.activeScope = null; // Linked Root Dashboard or Vocab Master Cluster { type, title, path, words: [] }
    this.cardsFilterCategory = 'all'; // 'all' | 'greek' | 'latin' | 'vocab'
    this.cardsFilterStatus = 'all';   // 'all' | 'unread' | 'learning' | 'learned'
    this.cardsSearchQuery = '';
    this.cardsViewMode = 'feed';      // 'feed' | 'list'
    this.pendingCardPath = null;

    // Daily Word State (Random word drawn from pure vocabulary pool)
    this.dailyCurrentCard = null;
    this.dailyRevealed = false;
    this.dailyReviewedCount = 0;

    // Settings & Appearance
    this.theme = localStorage.getItem('vocab_theme') || 'dark';
    this.typography = JSON.parse(localStorage.getItem('vocab_typography') || '{"font":"sans","size":16,"lineHeight":1.6}');

    // Touch gesture tracking
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;

    // Dataview + Markdown Runtime
    this.runtime = new VaultRuntime(this);
  }

  async init() {
    this.applyTheme(this.theme);
    this.applyTypography();
    this.loadStatusDb();
    this.loadDailyStats();

    this.bindDOMEvents();
    this.bindTouchGestures();
    this.bindHardwareBack();

    // Render Home Root
    this.renderHomeRoot();

    // Load Vault Data (Preloaded bundle + static index)
    await this.loadVaultData();

    // Hydrate Dataview Runtime with vault index pages
    if (this.vaultIndex.pages && this.vaultIndex.pages.length > 0) {
      this.runtime.hydrateIndex(this.vaultIndex.pages, this.statusDb);
    }

    // Initialize Card Views & Telemetry
    this.prepareWordCards();
    this.renderFeedCard('none');
    this.renderDailyCard(true);
    this.updateTrackingHUD();
  }

  bindHardwareBack() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        window.Capacitor.Plugins.App.addListener('backButton', () => {
          this.handleHardwareBack();
        });
      }
    } catch (e) {
      console.warn('Capacitor App listener unavailable', e);
    }

    window.addEventListener('popstate', (e) => {
      if (this.activeTab === 'home' && this.homeStack.length > 0) {
        this.goBackHome(false);
      }
    });
  }

  handleHardwareBack() {
    if (this.activeTab === 'home') {
      if (this.homeStack.length > 0) {
        this.goBackHome(true);
      } else {
        try {
          window.Capacitor?.Plugins?.App?.exitApp();
        } catch {}
      }
    } else if (this.activeTab === 'cards') {
      if (this.cardsViewMode === 'list') {
        this.cardsViewMode = 'feed';
        this.updateCardsViewMode();
      } else {
        this.switchTab('home');
      }
    } else if (this.activeTab === 'daily' || this.activeTab === 'settings') {
      this.switchTab('home');
    }
  }

  /* ========================================================================
     DATA LOADING & STATUS TRACKING
     ======================================================================== */

  loadStatusDb() {
    try {
      const saved = localStorage.getItem('vocab_status_db');
      if (saved) {
        this.statusDb = JSON.parse(saved);
      }
    } catch (e) {
      this.statusDb = {};
    }
  }

  saveStatusDb() {
    try {
      localStorage.setItem('vocab_status_db', JSON.stringify(this.statusDb));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  loadDailyStats() {
    const today = new Date().toISOString().slice(0, 10);
    const savedDate = localStorage.getItem('vocab_daily_date');
    if (savedDate === today) {
      this.dailyReviewedCount = Number(localStorage.getItem('vocab_daily_count') || 0);
    } else {
      this.dailyReviewedCount = 0;
      localStorage.setItem('vocab_daily_date', today);
      localStorage.setItem('vocab_daily_count', '0');
    }
    this.updateDailyHeader();
  }

  incrementDailyCount() {
    this.dailyReviewedCount++;
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('vocab_daily_date', today);
    localStorage.setItem('vocab_daily_count', String(this.dailyReviewedCount));
    this.updateDailyHeader();
  }

  updateDailyHeader() {
    const badge = document.getElementById('daily-reviewed-badge');
    if (badge) {
      badge.textContent = `${this.dailyReviewedCount} words reviewed today`;
    }
  }

  async loadVaultData() {
    try {
      // 1. Fetch pre-bundled core notes
      const coreRes = await fetch('data/core-notes.json');
      if (coreRes.ok) {
        this.coreNotes = await coreRes.json();
      }
    } catch (e) {
      console.warn('Could not load core-notes.json', e);
    }

    try {
      // 2. Fetch status-db.json defaults if local is empty
      if (Object.keys(this.statusDb).length === 0) {
        const stRes = await fetch('data/status-db.json');
        if (stRes.ok) {
          const defaults = await stRes.json();
          this.statusDb = { ...defaults };
          this.saveStatusDb();
        }
      }
    } catch (e) {
      console.warn('Could not load status-db.json', e);
    }

    try {
      // 3. Fetch full pure vocabulary index
      let idxData = null;
      try {
        const apiRes = await fetch('/api/vault-index');
        if (apiRes.ok) idxData = await apiRes.json();
      } catch {}

      if (!idxData) {
        const staticRes = await fetch('data/vault-index.json');
        if (staticRes.ok) idxData = await staticRes.json();
      }

      if (idxData) {
        // Enforce pure vocabulary filter (Greek roots, Latin roots, English vocabulary master)
        const purePages = (idxData.pages || []).filter(p =>
          p.p.startsWith('Greek roots/') ||
          p.p.startsWith('Latin roots/') ||
          p.p.startsWith('English vocabulary master/') ||
          p.p === '00 Language Hub.md'
        );
        this.vaultIndex = { ...idxData, pages: purePages, totalNotes: purePages.length };
        this.runtime.hydrateIndex(purePages, this.statusDb);
      }
    } catch (e) {
      console.warn('Could not load vault-index.json', e);
    }
  }

  /* ========================================================================
     NOTE CLASSIFICATION (STUDY PAGES vs INDIVIDUAL WORD NOTES)
     ======================================================================== */

  /**
   * Study pages belong on the Home Tab Stack (Dashboards, Clusters, MOCs, Prefixes, Suffixes, Rules).
   */
  isStudyPage(notePath) {
    if (!notePath || !notePath.endsWith('.md')) return false;
    if (notePath.includes('_assets') || notePath.includes('Templates')) return false;
    if (notePath === '00 Language Hub.md') return true;

    const baseName = notePath.slice(notePath.lastIndexOf('/') + 1).replace(/\.md$/i, '');
    const lowerBase = baseName.toLowerCase();

    // Dashboards, Master tables, MOCs, Triage, Rules, References
    if (baseName.startsWith('Dashboard —') || baseName.startsWith('Master Table') || baseName.startsWith('Word Triage')) return true;
    if (baseName.endsWith('Progress') || baseName.endsWith('MOC') || baseName.endsWith('Dashboards')) return true;
    if (baseName.startsWith('Semantic Field —') || baseName.startsWith('Concept —') || baseName.startsWith('Overview —') || baseName.startsWith('Table —')) return true;
    if (baseName.startsWith('00_') || baseName.startsWith('01_') || baseName.startsWith('02_') || baseName.startsWith('03_')) return true;
    if (notePath.includes('03_Reference_and_Rules') || notePath.includes('01_Root_Dashboards')) return true;

    // Prefixes, Suffixes, Rules, Atlas, Methods
    if (lowerBase.startsWith('prefix') || lowerBase.startsWith('suffix')) return true;
    if (baseName.includes('Rules') || baseName.includes('Atlas') || baseName.includes('Method') || baseName.includes('Formula')) return true;

    // Folder root notes where folder name equals note name (e.g. "Greek roots/Greek roots.md" or "Cluster .../Cluster ....md")
    const dirParts = notePath.split('/');
    if (dirParts.length >= 2 && dirParts[dirParts.length - 2] === baseName) return true;
    if (baseName.startsWith('Cluster ') && baseName === dirParts[dirParts.length - 1].replace(/\.md$/i, '')) return true;

    return false;
  }

  /**
   * Individual vocabulary word notes belong in Tab 2 (Word Cards TikTok feed) and Tab 3 (Daily Word).
   */
  isWordCard(notePath) {
    if (!notePath || !notePath.endsWith('.md')) return false;
    // Pure vocabulary vault folders only:
    if (!notePath.startsWith('Greek roots/') && !notePath.startsWith('Latin roots/') && !notePath.startsWith('English vocabulary master/')) {
      return false;
    }
    return !this.isStudyPage(notePath);
  }

  getCategoryFromPath(path) {
    if (path.startsWith('Greek roots')) return 'greek';
    if (path.startsWith('Latin roots')) return 'latin';
    if (path.startsWith('English vocabulary master')) return 'vocab';
    return 'other';
  }

  getClusterFromPath(path) {
    const parts = path.split('/');
    for (const part of parts) {
      if (part.startsWith('Cluster ') || part.startsWith('Dashboard — ')) {
        return part.replace(/^Cluster\s+/, '').replace(/^Dashboard\s+—\s+/, '');
      }
    }
    return parts[1] || '';
  }

  findRootDashboardForWord(wordPath) {
    const parts = wordPath.split('/');
    if (parts.length >= 4) {
      const folderPath = parts.slice(0, 3).join('/');
      const rootFolder = parts[2];
      const dashName = rootFolder.startsWith('Dashboard — ') ? rootFolder : `Dashboard — ${rootFolder}`;
      const candidate = `${folderPath}/${dashName}.md`;
      const match = (this.vaultIndex.pages || []).find(p => p.p === candidate || p.p.toLowerCase() === candidate.toLowerCase());
      if (match) {
        return { path: match.p, title: dashName };
      }
    }
    return null;
  }

  /**
   * Find all verified exhaustive derivative words for a specific Root Dashboard, Vocab Master Cluster, or Discipline Section.
   */
  getWordsForScope(scopePath) {
    if (!scopePath || !this.allWordCards || this.allWordCards.length === 0) return [];
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
      fileName === 'Master Table — Greek Roots.md' ||
      parts.length <= 2
    );
    const isLatinSection = scopePath.startsWith('Latin roots') && (
      fileName === 'Latin roots.md' ||
      fileName === 'Dashboard — Latin Roots.md' ||
      fileName === 'Master Table — Latin Roots.md' ||
      parts.length <= 2
    );

    // 1. Full Discipline Section Scope (Tab 1 Master Section opened)
    if (isVocabSection) {
      return this.allWordCards.filter(c => c.category === 'vocab');
    }
    if (isGreekSection) {
      return this.allWordCards.filter(c => c.category === 'greek');
    }
    if (isLatinSection) {
      return this.allWordCards.filter(c => c.category === 'latin');
    }

    // 2. Classical Root Dashboard (Latin / Greek individual root)
    if (isDash && !fileName.includes('Roots')) {
      const folder = parts.slice(0, -1).join('/');
      const dashName = fileName.replace(/\.md$/, '').trim();
      const rootName = dashName.replace(/^Dashboard\s+—\s+/, '').trim();

      return this.allWordCards.filter(c => {
        if (c.path === scopePath) return false;
        // Direct folder matching: Latin roots/.../Dashboard — root/<word>.md
        if (folder && c.path.startsWith(folder + '/')) {
          const fn = c.path.split('/').pop();
          if (!fn.startsWith('Dashboard') && !fn.startsWith('Cluster') && !fn.startsWith('Word Triage')) return true;
        }
        // Frontmatter metadata link matching
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

      return this.allWordCards.filter(c => {
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

  /**
   * Dynamically link Tab 2 (TikTok Word Feed) to the active Root Dashboard or Cluster from Tab 1.
   */
  openScopeInFeed(scope) {
    if (!scope || !scope.words || scope.words.length === 0) return;
    this.activeScope = scope;
    this.cardsFilterCategory = 'all';
    this.cardsFilterStatus = 'all';
    this.cardsSearchQuery = '';
    this.feedWordIndex = 0;

    const searchInput = document.getElementById('cards-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
    document.querySelectorAll('#cards-status-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.status === 'all'));

    this.switchTab('cards');
    this.cardsViewMode = 'feed';
    this.updateCardsViewMode();
    this.applyCardsFilter();
    this.renderFeedCard('none');
    this.showToast(`Linked: ${scope.title} (${this.filteredCards.length} exhaustive words)`);
  }

  /**
   * Mobile-Optimized "Original" Button: opens full original markdown note in reader view.
   */
  openOriginalNoteView(notePath) {
    if (!notePath) return;
    this.returnToFeedIndex = this.feedWordIndex;
    this.switchTab('home');
    this.openHomeSection(notePath, '', true);
  }

  prepareWordCards() {
    const pages = this.vaultIndex.pages || [];
    this.allWordCards = [];

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      const notePath = p.p;

      // Strictly include only individual vocabulary words
      if (this.isWordCard(notePath)) {
        const cleanName = notePath.slice(notePath.lastIndexOf('/') + 1).replace(/\.md$/i, '');
        const category = this.getCategoryFromPath(notePath);
        const cluster = this.getClusterFromPath(notePath);
        const status = this.getStatus(notePath);

        this.allWordCards.push({
          path: notePath,
          name: cleanName,
          category,
          cluster,
          status,
          rawPage: p
        });
      }
    }

    this.applyCardsFilter();

    if (this.pendingCardPath) {
      const pending = this.pendingCardPath;
      this.pendingCardPath = null;
      this.openWordCardByPath(pending);
    }
  }

  getStatus(notePath) {
    if (this.statusDb[notePath]) return this.statusDb[notePath];
    return 'unread';
  }

  setStatus(notePath, newStatus) {
    this.statusDb[notePath] = newStatus;
    this.saveStatusDb();

    // Haptic touch feedback if supported
    if (navigator.vibrate) navigator.vibrate(15);

    // Sync in card array
    const card = this.allWordCards.find(c => c.path === notePath);
    if (card) card.status = newStatus;

    // Send to backend if online
    fetch('/api/frontmatter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: notePath, updates: { status: newStatus } })
    }).catch(() => {});

    // Refresh UI indicators
    this.updateTopStatusBadge(newStatus);
    this.updateTrackingHUD();
    this.showToast(`Marked ${newStatus === 'learned' ? '🟢 Learned' : newStatus === 'learning' ? '🟡 Studying' : '🔴 Unread'}`);
  }

  cycleStatus(notePath) {
    const current = this.getStatus(notePath);
    const next = current === 'unread' ? 'learning' : current === 'learning' ? 'learned' : 'unread';
    this.setStatus(notePath, next);
    return next;
  }

  resolveLinkPath(target, currentPath = '') {
    const withoutHash = target.split('#')[0].trim();
    const clean = withoutHash.replace(/\\/g, '/').replace(/^\.?\//, '').trim();
    if (this.vaultIndex && this.vaultIndex.pages) {
      const match = this.vaultIndex.pages.find(p =>
        p.p.toLowerCase() === clean.toLowerCase() ||
        p.p.toLowerCase() === (clean.toLowerCase() + '.md') ||
        p.p.toLowerCase().endsWith('/' + clean.toLowerCase()) ||
        p.p.toLowerCase().endsWith('/' + clean.toLowerCase() + '.md') ||
        p.p.slice(p.p.lastIndexOf('/') + 1).replace(/\.md$/i, '').toLowerCase() === clean.toLowerCase()
      );
      if (match) return match.p;
    }
    return clean.endsWith('.md') ? clean : `${clean}.md`;
  }

  /* ========================================================================
     NAVIGATION & TAB SWITCHING
     ======================================================================== */

  switchTab(tabName) {
    if (this.activeTab === tabName) return;

    this.activeTab = tabName;

    // Update Bottom Nav Buttons
    document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tab === tabName);
    });

    // Update Screen Visibility
    document.querySelectorAll('.mobile-view-screen').forEach(screen => {
      screen.classList.remove('is-active-tab');
    });

    const activeScreen = document.getElementById(`view-${tabName}`);
    if (activeScreen) {
      activeScreen.classList.add('is-active-tab');
    }

    // Update Top Navigation Bar Context
    this.updateTopBar();

    // Trigger tab-specific refreshes
    if (tabName === 'cards') {
      this.applyCardsFilter();
      if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
      else this.renderCardList();
    } else if (tabName === 'daily') {
      if (!this.dailyCurrentCard) this.renderDailyCard(true);
    } else if (tabName === 'settings') {
      this.updateTrackingHUD();
    }
  }

  updateTopBar() {
    const backBtn = document.getElementById('top-back-btn');
    const breadcrumbs = document.getElementById('top-breadcrumbs');
    const statusBadge = document.getElementById('top-status-badge');

    if (this.activeTab === 'home') {
      if (this.homeStack.length > 0) {
        backBtn.style.display = 'inline-flex';
        let crumbsHtml = `<span class="crumb-link" data-depth="-1">Home</span>`;
        for (let i = 0; i < this.homeStack.length; i++) {
          const item = this.homeStack[i];
          const isLast = i === this.homeStack.length - 1;
          crumbsHtml += ` <span style="opacity:0.4;">/</span> `;
          if (isLast) {
            crumbsHtml += `<span class="crumb-active">${escapeHtml(item.title)}</span>`;
          } else {
            crumbsHtml += `<span class="crumb-link" data-depth="${i}">${escapeHtml(item.title)}</span>`;
          }
        }
        breadcrumbs.innerHTML = crumbsHtml;
        breadcrumbs.querySelectorAll('.crumb-link').forEach(link => {
          link.addEventListener('click', () => {
            const depth = Number(link.dataset.depth);
            if (depth === -1) {
              this.renderHomeRoot();
            } else {
              while (this.homeStack.length > depth + 1) {
                this.goBackHome(false);
              }
            }
          });
        });

        const current = this.homeStack[this.homeStack.length - 1];
        if (current.path && !current.isHomeRoot) {
          const st = this.getStatus(current.path);
          this.updateTopStatusBadge(st);
        } else {
          statusBadge.style.display = 'none';
        }
      } else {
        backBtn.style.display = 'none';
        breadcrumbs.innerHTML = `<span class="crumb-active">🏛️ Pure Vocabulary Vault</span>`;
        statusBadge.style.display = 'none';
      }
    } else if (this.activeTab === 'cards') {
      backBtn.style.display = 'none';
      breadcrumbs.innerHTML = `<span class="crumb-active">📱 Word Feed (${this.filteredCards.length.toLocaleString()})</span>`;
      statusBadge.style.display = 'none';
    } else if (this.activeTab === 'daily') {
      backBtn.style.display = 'none';
      breadcrumbs.innerHTML = `<span class="crumb-active">🎲 Daily Random Discovery</span>`;
      statusBadge.style.display = 'none';
    } else if (this.activeTab === 'settings') {
      backBtn.style.display = 'none';
      breadcrumbs.innerHTML = `<span class="crumb-active">⚙️ Settings & Tracking HUD</span>`;
      statusBadge.style.display = 'none';
    }
  }

  updateTopStatusBadge(status) {
    const badge = document.getElementById('top-status-badge');
    const dot = document.getElementById('top-status-dot');
    const text = document.getElementById('top-status-text');

    if (!badge || !dot || !text) return;

    badge.className = `status-indicator-pill ${status}`;
    badge.style.display = 'inline-flex';
    dot.textContent = status === 'learned' ? '🟢' : status === 'learning' ? '🟡' : '🔴';
    text.textContent = status === 'learned' ? 'Learned' : status === 'learning' ? 'Studying' : 'Unread';
  }

  /* ========================================================================
     TAB 1: HOME HUB & STUDY SUBPAGE STACK
     ======================================================================== */

  renderHomeRoot() {
    this.homeStack = [];
    this.currentHomeNote = null;
    this.activeScope = null;
    this.updateTopBar();

    const container = document.getElementById('home-page-container');
    container.innerHTML = '';

    const rootCard = document.createElement('div');
    rootCard.className = 'home-page-card-stack';

    // Calculate quick counts for pure vocabulary
    let totalLearned = 0;
    let totalStudying = 0;
    for (const p in this.statusDb) {
      if (this.statusDb[p] === 'learned') totalLearned++;
      else if (this.statusDb[p] === 'learning') totalStudying++;
    }

    rootCard.innerHTML = `
      <div class="home-hero-card">
        <div class="home-hero-pre">PURE VOCABULARY & CLASSICAL MORPHOLOGY</div>
        <div class="home-hero-title">Unified Vocabulary Vault</div>
        <div class="home-hero-subtitle">Master classical Greek & Latin roots, evocative non-classical English, and essential morphological dashboards.</div>

        <div class="home-quick-stats-row">
          <div class="quick-stat-box">
            <div class="quick-stat-num" id="home-stat-learned" style="color:var(--web-success,#30D158);">${totalLearned}</div>
            <div class="quick-stat-lbl">Learned</div>
          </div>
          <div class="quick-stat-box">
            <div class="quick-stat-num" id="home-stat-studying" style="color:var(--web-amber,#FF9F0A);">${totalStudying}</div>
            <div class="quick-stat-lbl">Studying</div>
          </div>
          <div class="quick-stat-box">
            <div class="quick-stat-num" id="home-stat-total">51.6k</div>
            <div class="quick-stat-lbl">Total Words</div>
          </div>
        </div>
      </div>

      <div class="home-section-title">
        <span>VOCABULARY DISCIPLINES</span>
        <span style="font-size:11px; opacity:0.8;">Tap to study</span>
      </div>

      <div class="category-card-list">
        <div class="category-card" data-open-path="Greek roots/Greek roots.md" data-title="Greek Roots">
          <div class="category-icon-box">🏛️</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Greek Roots</span>
              <span id="prog-text-greek" style="font-size:12px; color:var(--web-text-muted);">17,987 words</span>
            </div>
            <div class="category-meta-desc">Scientific, medical, rhetorical & philosophical Greek roots and prefixes</div>
            <div class="category-progress-bar"><div id="prog-fill-greek" class="category-progress-fill" style="width: 0%;"></div></div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="Latin roots/Latin roots.md" data-title="Latin Roots">
          <div class="category-icon-box">📜</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Latin Roots</span>
              <span id="prog-text-latin" style="font-size:12px; color:var(--web-text-muted);">33,028 words</span>
            </div>
            <div class="category-meta-desc">Classical stems, legal, scholarly & everyday English vocabulary</div>
            <div class="category-progress-bar"><div id="prog-fill-latin" class="category-progress-fill" style="width: 0%;"></div></div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="English vocabulary master/English vocabulary master.md" data-title="Vocabulary Master">
          <div class="category-icon-box">👑</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>English Vocabulary Master</span>
              <span id="prog-text-vocab" style="font-size:12px; color:var(--web-text-muted);">583 words</span>
            </div>
            <div class="category-meta-desc">Anglo-Saxon, Old Norse, Celtic & expressive non-classical terms</div>
            <div class="category-progress-bar"><div id="prog-fill-vocab" class="category-progress-fill" style="width: 0%;"></div></div>
          </div>
          <div class="category-chevron">›</div>
        </div>
      </div>

      <div class="home-section-title" style="margin-top:22px;">
        <span>ESSENTIAL STUDY DASHBOARDS</span>
        <span style="font-size:11px; opacity:0.8;">Reference & MOCs</span>
      </div>

      <div class="category-card-list">
        <div class="category-card" data-open-path="Latin roots/Master Table — Latin Roots.md" data-title="Master Table — Latin Roots">
          <div class="category-icon-box">📋</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Master Table of Latin Roots</span>
            </div>
            <div class="category-meta-desc">782 canonical Latin roots directory with instant root dashboard links</div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="Greek roots/01_Root_Dashboards/Dashboard — Greek Roots.md" data-title="Dashboard — Greek Roots">
          <div class="category-icon-box">🏛️</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Greek Roots Master Dashboard</span>
            </div>
            <div class="category-meta-desc">Comprehensive directory of Greek root dashboards and semantic families</div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="Latin roots/03_Reference_and_Rules/Prefix latin.md" data-title="Prefix Latin">
          <div class="category-icon-box">🔤</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Prefix Latin — Morphological Rules</span>
            </div>
            <div class="category-meta-desc">Assimilation rules, directionals, intensives & euphonic prefix shifts</div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="Greek roots/03_Reference_and_Rules/Prefix Greek.md" data-title="Greek Prefixes Guide">
          <div class="category-icon-box">🔤</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Prefix Greek — Morphological Rules</span>
            </div>
            <div class="category-meta-desc">Alpha privative, prepositional compounding & classical Greek prefixes</div>
          </div>
          <div class="category-chevron">›</div>
        </div>

        <div class="category-card" data-open-path="English vocabulary master/000_Vocabulary_Master_MOC.md" data-title="Vocabulary Master MOC">
          <div class="category-icon-box">🗺️</div>
          <div class="category-meta">
            <div class="category-meta-title">
              <span>Vocabulary Master MOC</span>
            </div>
            <div class="category-meta-desc">Semantic clusters across Anglo-Saxon kennings, phonaesthemes & non-classical strata</div>
          </div>
          <div class="category-chevron">›</div>
        </div>
      </div>
    `;

    // Event listeners on cards
    rootCard.querySelectorAll('[data-open-path]').forEach(el => {
      el.addEventListener('click', () => {
        const path = el.dataset.openPath;
        const title = el.dataset.title || path;
        this.openHomeSection(path, title);
      });
    });

    container.appendChild(rootCard);
  }

  async openHomeSection(notePath, noteTitle = '', isDirectOriginalView = false) {
    // If the note is an individual word card and not opened via Original button, ROUTE TO TAB 2!
    if (!isDirectOriginalView && this.isWordCard(notePath)) {
      this.switchTab('cards');
      this.openWordCardByPath(notePath);
      return;
    }

    // It's a Study Page or Direct Original Note View -> Open in Home Stack!
    const title = noteTitle || notePath.slice(notePath.lastIndexOf('/') + 1).replace(/\.md$/i, '');
    this.homeStack.push({ path: notePath, title, isHomeRoot: false, isOriginalNoteView: isDirectOriginalView });
    this.updateTopBar();

    try {
      window.history.pushState({ notePath, depth: this.homeStack.length }, '');
    } catch {}

    const container = document.getElementById('home-page-container');

    // Create new page element
    const pageEl = document.createElement('div');
    pageEl.className = 'home-page-card-stack page-enter-right';

    pageEl.innerHTML = `
      <div class="note-page-reader">
        <div class="note-page-header">
          <h1 class="note-page-title">${escapeHtml(title)}</h1>
          <div class="note-page-meta-row">
            <span style="font-size:12px; color:var(--web-text-muted);">${escapeHtml(notePath)}</span>
          </div>
        </div>
        <div class="note-body-content markdown-reading-view">
          <div style="padding:20px; text-align:center; color:var(--web-text-muted);">Loading note content...</div>
        </div>
      </div>
    `;

    container.appendChild(pageEl);

    // Fetch note content
    let rawContent = this.coreNotes[notePath] || '';
    if (!rawContent) {
      try {
        const res = await fetch(`/api/note?path=${encodeURIComponent(notePath)}`);
        if (res.ok) {
          const data = await res.json();
          rawContent = data.content || '';
          this.coreNotes[notePath] = rawContent;
        }
      } catch (e) {
        console.warn('Could not fetch note', e);
      }
    }

    const bodyContainer = pageEl.querySelector('.note-body-content');
    if (rawContent) {
      const rendered = renderObsidianMarkdown(rawContent, notePath, this.runtime);
      bodyContainer.innerHTML = rendered.html;

      // A. If opened via [📄 Original Note], prepend smooth return to feed bar
      if (isDirectOriginalView) {
        const returnBar = document.createElement('div');
        returnBar.className = 'return-to-feed-bar';
        returnBar.innerHTML = `
          <span>‹ Return to Word Feed</span>
          <span>Card #${(this.returnToFeedIndex + 1).toLocaleString()} ›</span>
        `;
        returnBar.addEventListener('click', () => {
          this.switchTab('cards');
          this.renderFeedCard('none');
        });
        bodyContainer.prepend(returnBar);
      }

      // B. If a Root Dashboard, Vocab Master Cluster, or Discipline Section is opened, link Tab 2 and inject study CTA banner
      if (!isDirectOriginalView) {
        const scopeWords = this.getWordsForScope(notePath);
        if (scopeWords.length > 0) {
          const isDash = notePath.includes('Dashboard —') || (notePath.endsWith('.md') && notePath.split('/').pop().startsWith('Dashboard —'));
          const isVocab = notePath.startsWith('English vocabulary master');
          const isCluster = notePath.includes('Cluster ') || notePath.includes('Semantic Field');
          const scopeType = isDash ? 'root' : isCluster ? 'cluster' : 'discipline';

          this.activeScope = {
            type: scopeType,
            title: title,
            path: notePath,
            words: scopeWords
          };

          const ctaEl = document.createElement('div');
          ctaEl.className = 'home-study-feed-cta';
          ctaEl.innerHTML = `
            <div class="cta-left">
              <div class="cta-title">⚡ Study All ${scopeWords.length} ${isDash ? 'Exhaustive Derivatives' : 'Words'} in Feed (Tab 2)</div>
              <div class="cta-sub">${escapeHtml(title)} scoped directly into TikTok Word Feed</div>
            </div>
            <div class="cta-btn-pill">Study in Feed ›</div>
          `;
          ctaEl.addEventListener('click', () => {
            this.openScopeInFeed(this.activeScope);
          });
          bodyContainer.prepend(ctaEl);
        } else {
          // If viewing general reference rules or files without vocabulary words, clear activeScope
          if (!notePath.includes('00 Language Hub') && !notePath.includes('Progress')) {
            this.activeScope = null;
          }
        }
      }

      // 1. Execute all ```dataviewjs blocks in this note!
      const dvSlots = bodyContainer.querySelectorAll('.dataviewjs-container');
      dvSlots.forEach(slot => {
        const idx = Number(slot.getAttribute('data-dv-index'));
        const code = rendered.dataviewBlocks[idx];
        if (code && this.runtime && this.runtime.executeDataviewJS) {
          try {
            this.runtime.executeDataviewJS(code, slot, notePath);
          } catch (err) {
            console.warn('Dataview execution error in note:', notePath, err);
          }
        }
      });

      // 1b. Mount Meta Bind status toggles (`INPUT[inlineSelect(...):status]`)
      const metaMounts = bodyContainer.querySelectorAll('.meta-bind-status-mount');
      metaMounts.forEach(mount => {
        const row = mount.closest('tr');
        const rowLink = row ? row.querySelector('a.internal-link[data-href]') : null;
        const targetPath = rowLink
          ? this.resolveLinkPath(rowLink.getAttribute('data-href'), notePath)
          : notePath;
        const currentStatus = this.getStatus(targetPath);
        const toggle = createAppleStatusToggle(currentStatus, async (nextStatus) => {
          this.setStatus(targetPath, nextStatus);
        });
        mount.replaceWith(toggle);
      });

      // 2. Wire up all internal links (from Markdown & Dataview)
      bodyContainer.querySelectorAll('a.internal-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.dataset.href;
          if (target) {
            const resolved = this.resolveLinkPath(target, notePath);
            if (this.isWordCard(resolved)) {
              this.switchTab('cards');
              this.openWordCardByPath(resolved);
            } else {
              this.openHomeSection(resolved);
            }
          }
        });
      });
    } else {
      // Fallback: list child words & dashboards in this folder
      const folder = notePath.slice(0, notePath.lastIndexOf('/') + 1);
      const childWords = (this.vaultIndex.pages || []).filter(p => p.p.startsWith(folder) && p.p !== notePath && !p.p.endsWith('Dashboard — ' + title + '.md'));

      if (childWords.length > 0) {
        let listHtml = `
          <div style="margin-bottom:16px;">
            <div style="font-size:11px; font-weight:800; letter-spacing:1px; color:var(--web-accent); text-transform:uppercase; margin-bottom:4px;">CLASSICAL ROOT DASHBOARD</div>
            <h2 style="font-size:20px; font-weight:800; color:var(--web-text-primary); margin-bottom:6px;">${escapeHtml(title)}</h2>
            <p style="font-size:13px; color:var(--web-text-secondary); margin-bottom:14px;">${childWords.length} vocabulary notes in this section. Tap any card below to study:</p>
          </div>
          <div class="category-card-list">
        `;

        for (const cw of childWords) {
          const wName = cw.p.slice(cw.p.lastIndexOf('/') + 1).replace(/\.md$/i, '');
          const st = this.getStatus(cw.p);
          const badge = st === 'learned' ? '🟢 Learned' : st === 'learning' ? '🟡 Studying' : '🔴 Unread';
          const badgeCls = st;
          listHtml += `
            <div class="category-card" data-card-path="${escapeAttr(cw.p)}" style="padding:12px 14px;">
              <div class="category-meta">
                <div class="category-meta-title">
                  <span>${escapeHtml(wName)}</span>
                  <span class="status-indicator-pill ${badgeCls}" style="font-size:10px; padding:2px 8px;">${badge}</span>
                </div>
              </div>
              <div class="category-chevron">›</div>
            </div>
          `;
        }

        listHtml += `</div>`;
        bodyContainer.innerHTML = listHtml;

        bodyContainer.querySelectorAll('[data-card-path]').forEach(cardEl => {
          cardEl.addEventListener('click', () => {
            const cPath = cardEl.dataset.cardPath;
            if (this.isWordCard(cPath)) {
              this.switchTab('cards');
              this.openWordCardByPath(cPath);
            } else {
              this.openHomeSection(cPath);
            }
          });
        });
      } else {
        bodyContainer.innerHTML = `
          <div style="padding:24px 10px; text-align:center;">
            <p style="color:var(--web-text-secondary); margin-bottom:12px;">This study dashboard is ready in your vault.</p>
            <button class="settings-action-btn" style="max-width:240px; margin:0 auto;" id="btn-open-category-cards">
              📱 View Vocabulary Words in Feed Tab
            </button>
          </div>
        `;
        pageEl.querySelector('#btn-open-category-cards')?.addEventListener('click', () => {
          this.switchTab('cards');
        });
      }
    }
  }

  goBackHome(updateHistory = true) {
    if (this.homeStack.length === 0) return;

    const container = document.getElementById('home-page-container');
    const pages = container.querySelectorAll('.home-page-card-stack');

    if (pages.length > 1) {
      const topPage = pages[pages.length - 1];
      topPage.classList.add('page-exit-right');
      setTimeout(() => {
        topPage.remove();
      }, 250);
    }

    this.homeStack.pop();
    this.updateTopBar();

    if (this.homeStack.length === 0) {
      this.renderHomeRoot();
    }
  }

  advanceHomeNext() {
    // If reading a section, find next logical study page or child cluster
    const current = this.homeStack[this.homeStack.length - 1];
    if (!current || !current.path) return;

    const currentPath = current.path;
    const parentFolder = currentPath.slice(0, currentPath.lastIndexOf('/'));
    const peers = (this.vaultIndex.pages || []).filter(p =>
      p.p.startsWith(parentFolder) &&
      this.isStudyPage(p.p) &&
      p.p !== currentPath
    );

    if (peers.length > 0) {
      const nextNote = peers[0];
      this.openHomeSection(nextNote.p);
    }
  }

  /* ========================================================================
     TAB 2: WORD CARDS (TIKTOK-STYLE VERTICAL SWIPABLE FEED)
     ======================================================================== */

  applyCardsFilter() {
    const q = (this.cardsSearchQuery || '').toLowerCase().trim();
    const cat = this.cardsFilterCategory;
    const status = this.cardsFilterStatus;
    const scopeBanner = document.getElementById('cards-scope-banner');
    const scopeText = document.getElementById('scope-banner-text');

    let pool = this.allWordCards;

    // A. Apply Root Dashboard, Cluster, or Discipline Scope (Tab 1 <-> Tab 2 link)
    if (this.activeScope && this.activeScope.words && this.activeScope.words.length > 0) {
      const scopeSet = new Set(this.activeScope.words.map(w => w.path || w.p));
      pool = this.allWordCards.filter(c => scopeSet.has(c.path));
      if (scopeBanner) {
        scopeBanner.style.display = 'flex';
        if (scopeText) {
          scopeText.textContent = `Scoped: ${this.activeScope.title} (${pool.length} words)`;
        }
      }
      // Highlight category chip to match scoped category
      const firstCard = pool[0];
      if (firstCard && firstCard.category) {
        document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => {
          c.classList.toggle('active', c.dataset.cat === firstCard.category);
        });
      }
    } else {
      if (scopeBanner) scopeBanner.style.display = 'none';
      document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.cat === cat);
      });
    }

    this.filteredCards = pool.filter(c => {
      // Category filter (only active if not scoped)
      if (!this.activeScope && cat !== 'all' && c.category !== cat) return false;

      // Status filter
      if (status !== 'all' && c.status !== status) return false;

      // Query filter
      if (q) {
        const nameMatch = c.name.toLowerCase().includes(q);
        const clusterMatch = (c.cluster || '').toLowerCase().includes(q);
        return nameMatch || clusterMatch;
      }
      return true;
    });

    if (this.feedWordIndex >= this.filteredCards.length) {
      this.feedWordIndex = Math.max(0, this.filteredCards.length - 1);
    }
  }

  async renderFeedCard(direction = 'none') {
    const container = document.getElementById('tiktok-feed-wrapper');
    if (!container) return;

    if (this.filteredCards.length === 0) {
      container.innerHTML = `
        <div class="tiktok-slide" style="align-items:center; justify-content:center; text-align:center;">
          <div style="font-size: 38px; margin-bottom: 12px;">🔍</div>
          <div style="font-size: 18px; font-weight: 800; color: var(--web-text-primary);">No Vocabulary Words Found</div>
          <div style="font-size: 13px; color: var(--web-text-muted); margin-top: 6px; max-width: 260px;">
            ${this.activeScope ? `No words in ${escapeHtml(this.activeScope.title)} match your filter.` : 'No individual words match your active category or status filter.'}
          </div>
          <button class="settings-action-btn" id="btn-reset-feed-filters" style="margin-top: 16px; max-width: 180px;">
            ${this.activeScope ? 'Clear Scope & Reset' : 'Reset Filters'}
          </button>
        </div>
      `;
      container.querySelector('#btn-reset-feed-filters')?.addEventListener('click', () => {
        this.activeScope = null;
        this.cardsSearchQuery = '';
        this.cardsFilterCategory = 'all';
        this.cardsFilterStatus = 'all';
        const searchInput = document.getElementById('cards-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
        document.querySelectorAll('#cards-status-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.status === 'all'));
        this.applyCardsFilter();
        this.renderFeedCard('none');
      });
      return;
    }

    if (this.feedWordIndex >= this.filteredCards.length) this.feedWordIndex = this.filteredCards.length - 1;
    if (this.feedWordIndex < 0) this.feedWordIndex = 0;

    const card = this.filteredCards[this.feedWordIndex];
    const status = this.getStatus(card.path);

    // Update position pill
    const posPill = document.getElementById('feed-position-pill');
    if (posPill) {
      posPill.textContent = `${(this.feedWordIndex + 1).toLocaleString()} / ${this.filteredCards.length.toLocaleString()}`;
    }

    // Fetch card content if not cached
    let rawContent = this.coreNotes[card.path] || '';
    if (!rawContent) {
      try {
        const res = await fetch(`/api/note?path=${encodeURIComponent(card.path)}`);
        if (res.ok) {
          const data = await res.json();
          rawContent = data.content || '';
          this.coreNotes[card.path] = rawContent;
        }
      } catch (e) {}
    }

    const { defText, secondaryDef, quotes, quoteText, quoteAuthor, quoteWork, pos } = this.extractCardDetails(card, rawContent);
    const catLabel = card.category === 'greek' ? '🏛️ GREEK ROOT' : card.category === 'latin' ? '📜 LATIN ROOT' : '👑 VOCAB MASTER';

    // Find parent root dashboard if available
    const rootDash = this.findRootDashboardForWord(card.path);

    const slideEl = document.createElement('div');
    slideEl.className = 'tiktok-slide';
    if (direction === 'up') slideEl.classList.add('slide-up-in');
    else if (direction === 'down') slideEl.classList.add('slide-down-in');

    const quoteList = quotes && quotes.length > 0
      ? quotes
      : (quoteText ? [{ quote: quoteText, author: quoteAuthor, work: quoteWork }] : []);

    slideEl.innerHTML = `
      <div class="tiktok-card-surface">
        <div class="tiktok-top-meta">
          <span class="tiktok-cat-badge">${escapeHtml(catLabel)}</span>
          <div class="tiktok-action-group">
            <button class="tiktok-pronounce-btn" id="btn-pronounce-word" title="Pronounce Word">
              <span>🔊</span> <span>Listen</span>
            </button>
            <button class="tiktok-original-btn" id="btn-open-original-note" data-original-path="${escapeAttr(card.path)}" title="View Full Original Markdown Note">
              <span>📄</span> <span>Original Note</span>
            </button>
          </div>
        </div>

        <div class="tiktok-hero-block">
          <div class="tiktok-word-hero">${escapeHtml(card.name)}</div>
          <div class="tiktok-morph-row">
            <span class="tiktok-pos-pill">${escapeHtml(pos || 'derivative')}</span>
            <span class="tiktok-exhaustive-badge">
              <span>✅</span> <span>Exhaustive ${card.category === 'vocab' ? 'Cluster Entry' : 'Root Permutation'}</span>
            </span>
          </div>
        </div>

        ${(card.cluster || rootDash) ? `
          <div class="tiktok-keystone-row">
            <span>🌿 ${escapeHtml(card.cluster || 'Classical Cluster')}</span>
            ${rootDash ? `
              <span class="tiktok-keystone-link" id="link-open-root-dashboard" data-root-path="${escapeAttr(rootDash.path)}">
                🏛️ ${escapeHtml(rootDash.title)} ›
              </span>
            ` : ''}
          </div>
        ` : ''}

        <div class="tiktok-def-box">
          <div class="tiktok-def-header-row">
            <div class="tiktok-def-title">📖 Core Definition</div>
            <div class="tiktok-def-status-mount" id="feed-card-apple-toggle-mount"></div>
          </div>
          <div class="tiktok-def-text">${escapeHtml(defText)}</div>
          ${secondaryDef ? `
            <div class="tiktok-def-secondary">
              <div class="tiktok-def-secondary-label">💡 Nuance / Specialized Register</div>
              <div class="tiktok-def-secondary-text">${escapeHtml(secondaryDef)}</div>
            </div>
          ` : ''}
        </div>

        ${quoteList.length > 0 ? `
          <div class="tiktok-quotes-stack">
            <div class="tiktok-quotes-header">💬 Literary & Contextual Citations (${quoteList.length})</div>
            ${quoteList.map((q) => `
              <div class="tiktok-quote-box">
                <div class="tiktok-quote-text">“${this.formatQuoteHtml(q.quote, card.name)}”</div>
                ${(q.author || q.work) ? `
                  <div class="tiktok-quote-author">
                    <span>— ${escapeHtml(q.author)}${q.work ? ` <em>(${escapeHtml(q.work)})</em>` : ''}</span>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="swipe-indicator-cue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
          <span>Swipe up for next word</span>
        </div>
      </div>

      <div class="card-tracking-footer">
        <div class="card-status-btn-group">
          <button class="card-status-btn ${status === 'unread' ? 'active unread' : ''}" data-set-status="unread">
            <span>🔴</span> <span>Unread</span>
          </button>
          <button class="card-status-btn ${status === 'learning' ? 'active learning' : ''}" data-set-status="learning">
            <span>🟡</span> <span>Studying</span>
          </button>
          <button class="card-status-btn ${status === 'learned' ? 'active learned' : ''}" data-set-status="learned">
            <span>🟢</span> <span>Learned</span>
          </button>
        </div>
      </div>
    `;

    // Mount the original app's Apple Glide Toggle (.apple-c) right at the top of the definition!
    const appleMount = slideEl.querySelector('#feed-card-apple-toggle-mount');
    let appleToggleEl = null;
    if (appleMount) {
      appleToggleEl = createAppleStatusToggle(status, async (nextStatus) => {
        this.setStatus(card.path, nextStatus);
        slideEl.querySelectorAll('.card-status-btn').forEach(b => {
          const isMatch = b.dataset.setStatus === nextStatus;
          b.className = isMatch ? `card-status-btn active ${nextStatus}` : 'card-status-btn';
        });
      });
      appleMount.appendChild(appleToggleEl);
    }

    // Audio Speech Pronunciation
    slideEl.querySelector('#btn-pronounce-word')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.speakWord(card.name);
    });

    // Mobile-Optimized "Original" Button: opens full original markdown note in reader view
    slideEl.querySelector('#btn-open-original-note')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openOriginalNoteView(card.path);
    });

    // Keystone link to Root Dashboard on Home Tab
    slideEl.querySelector('#link-open-root-dashboard')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const rPath = e.currentTarget.dataset.rootPath;
      if (rPath) {
        this.switchTab('home');
        this.openHomeSection(rPath);
      }
    });

    // Status Rating Buttons
    slideEl.querySelectorAll('[data-set-status]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const st = btn.dataset.setStatus;
        this.setStatus(card.path, st);
        slideEl.querySelectorAll('.card-status-btn').forEach(b => {
          b.className = 'card-status-btn';
        });
        btn.className = `card-status-btn active ${st}`;
        if (appleToggleEl) {
          const pMap = { unread: 'p0', learning: 'p1', learned: 'p2' };
          const halo = appleToggleEl.querySelector('.halo-c');
          const lbl = appleToggleEl.querySelector('.label');
          if (halo) halo.className = `halo-c ${pMap[st] || 'p0'}`;
          if (lbl) {
            lbl.className = `label ${st}`;
            lbl.textContent = st;
          }
        }
        // Auto-advance to next word after rating
        setTimeout(() => {
          this.nextFeedWord();
        }, 320);
      });
    });

    const existingSlides = container.querySelectorAll('.tiktok-slide');
    if (existingSlides.length > 0 && direction !== 'none') {
      existingSlides.forEach((slide, idx) => {
        if (idx < existingSlides.length - 1) {
          slide.remove();
        }
      });
      const activeOldSlide = existingSlides[existingSlides.length - 1];
      activeOldSlide.classList.add(direction === 'up' ? 'slide-up-out' : 'slide-down-out');
      container.appendChild(slideEl);
      setTimeout(() => {
        activeOldSlide.remove();
      }, 260);
    } else {
      container.innerHTML = '';
      container.appendChild(slideEl);
    }
  }

  nextFeedWord() {
    if (this.feedWordIndex < this.filteredCards.length - 1) {
      this.feedWordIndex++;
      this.renderFeedCard('up');
    } else {
      this.showToast('Reached end of vocabulary deck');
    }
  }

  prevFeedWord() {
    if (this.feedWordIndex > 0) {
      this.feedWordIndex--;
      this.renderFeedCard('down');
    } else {
      this.showToast('At the beginning of vocabulary deck');
    }
  }

  speakWord(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  }

  openWordCardByPath(notePath) {
    if (!notePath) return;

    // If activeScope doesn't contain this word, clear activeScope so target word is visible
    if (this.activeScope && this.activeScope.words) {
      const inScope = this.activeScope.words.some(w => (w.path || w.p) === notePath);
      if (!inScope) {
        this.activeScope = null;
      }
    }

    // Reset filters if necessary so the target word is visible
    this.cardsSearchQuery = '';
    this.cardsFilterCategory = 'all';
    this.cardsFilterStatus = 'all';

    const searchInput = document.getElementById('cards-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
    document.querySelectorAll('#cards-status-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.status === 'all'));

    this.applyCardsFilter();

    let idx = this.filteredCards.findIndex(c => c.path === notePath || c.path.toLowerCase() === notePath.toLowerCase());
    if (idx === -1) {
      const baseName = notePath.slice(notePath.lastIndexOf('/') + 1).replace(/\.md$/i, '').toLowerCase();
      idx = this.filteredCards.findIndex(c => c.name.toLowerCase() === baseName);
    }

    if (idx !== -1) {
      this.feedWordIndex = idx;
    } else {
      this.feedWordIndex = 0;
    }

    this.cardsViewMode = 'feed';
    this.updateCardsViewMode();
    this.renderFeedCard('none');
  }

  updateCardsViewMode() {
    const feedEl = document.getElementById('cards-feed-view');
    const listEl = document.getElementById('cards-list-view');
    const btnFeed = document.getElementById('btn-mode-feed');
    const btnList = document.getElementById('btn-mode-list');

    if (this.cardsViewMode === 'feed') {
      if (feedEl) feedEl.style.display = 'flex';
      if (listEl) listEl.style.display = 'none';
      if (btnFeed) btnFeed.classList.add('active');
      if (btnList) btnList.classList.remove('active');
      this.renderFeedCard('none');
    } else {
      if (feedEl) feedEl.style.display = 'none';
      if (listEl) listEl.style.display = 'block';
      if (btnFeed) btnFeed.classList.remove('active');
      if (btnList) btnList.classList.add('active');
      this.renderCardList();
    }
  }

  renderCardList() {
    const listEl = document.getElementById('cards-list-view');
    if (!listEl) return;

    listEl.innerHTML = '';
    const slice = this.filteredCards.slice(0, 150);

    for (let i = 0; i < slice.length; i++) {
      const card = slice[i];
      const st = this.getStatus(card.path);
      const badge = st === 'learned' ? '🟢' : st === 'learning' ? '🟡' : '🔴';

      const item = document.createElement('div');
      item.className = 'card-list-item';
      item.innerHTML = `
        <div>
          <div class="card-list-item-title">${escapeHtml(card.name)}</div>
          <div class="card-list-item-cluster">${escapeHtml(card.cluster)} · ${escapeHtml(card.category)}</div>
        </div>
        <div style="font-size:16px;">${badge}</div>
      `;

      item.addEventListener('click', () => {
        this.feedWordIndex = this.filteredCards.indexOf(card);
        this.cardsViewMode = 'feed';
        this.updateCardsViewMode();
        this.renderFeedCard('none');
      });

      listEl.appendChild(item);
    }
  }

  cleanDefinitionText(raw) {
    if (!raw) return '';
    return raw
      .replace(/\[\[|\]\]/g, '')
      .replace(/;\s*;\s*-\s*[a-zA-Z\s.-]+$/g, '')
      .replace(/;\s*-\s*[a-zA-Z\s.-]+$/g, '')
      .replace(/;\s*;+/g, ';')
      .trim();
  }

  formatQuoteHtml(quoteStr, wordName) {
    if (!quoteStr) return '';
    let safe = escapeHtml(quoteStr.replace(/^\*+|\*+$/g, '').trim());
    // Convert ***word*** or **word** into highlighted strong tags
    safe = safe.replace(/\*{2,3}([^*]+)\*{2,3}/g, '<strong class="quote-word-hl">$1</strong>');
    if (!safe.includes('quote-word-hl') && wordName && wordName.length >= 3) {
      const escapedWord = wordName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b(${escapedWord}[a-z]*)\\b`, 'gi');
      safe = safe.replace(re, '<strong class="quote-word-hl">$1</strong>');
    }
    return safe;
  }

  extractCardDetails(card, rawContent) {
    let primaryDef = '';
    let secondaryDef = '';
    let pos = '';
    const quotes = [];

    if (rawContent) {
      // 1. Check frontmatter for pos or part_of_speech
      const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (fmMatch) {
        const posMatch = fmMatch[1].match(/(?:pos|part_of_speech)\s*:\s*["']?([A-Za-z]+)["']?/i);
        if (posMatch) pos = posMatch[1].toLowerCase();
      }

      const lines = rawContent.split(/\r?\n/);
      let currentSection = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.match(/>\s*\[!(?:book|definition|summary|note|lexicon|meaning)[^\]]*\]/i)) {
          currentSection = 'def';
          continue;
        } else if (line.match(/>\s*\[!(?:quote|cite|example|citation)[^\]]*\]/i)) {
          currentSection = 'quote';
          continue;
        } else if (line.match(/>\s*\[!/i) || (!line.startsWith('>') && line.trim().startsWith('#'))) {
          currentSection = null;
        }

        if (currentSection === 'def') {
          const clean = line.replace(/^>\s*(?:-\s*)?/, '').trim();
          if (!clean) continue;

          const pMatch = clean.match(/(?:1\.\s*)?\*\*(?:1\.\s*)?(?:Primary|Concise)[^*]*\*\*:\s*(.*)/i);
          if (pMatch && !primaryDef) {
            primaryDef = this.cleanDefinitionText(pMatch[1]);
          }

          const sMatch = clean.match(/(?:2\.\s*)?\*\*(?:2\.\s*)?(?:Secondary|Nuanced|Nuance)[^*]*\*\*:\s*(.*)/i);
          if (sMatch && !secondaryDef) {
            secondaryDef = this.cleanDefinitionText(sMatch[1]);
          }

          if (!primaryDef && clean.startsWith('1.')) {
            primaryDef = this.cleanDefinitionText(clean.replace(/^1\.\s*/, '').replace(/\*\*[^*]+\*\*:\s*/, ''));
          }
        } else if (currentSection === 'quote') {
          const clean = line.replace(/^>\s*-\s*(?:📜|📚|🔬|🌐|🗣️|💬)?\s*/, '').replace(/^>\s*/, '').trim();
          if (!clean) continue;

          const m = clean.match(/^\*\*([^*]+?)(?:\s*\(([^)]+)\))?:?\*\*:?\s*\*?["“]([^"”]+)["”]\*?/);
          if (m) {
            const author = (m[1] || '').replace(/[:*]/g, '').trim();
            const work = (m[2] || '').replace(/[:*]/g, '').trim();
            quotes.push({ author, work, quote: m[3].trim() });
          } else {
            const qm = clean.match(/["“]([^"”]+)["”]/);
            if (qm) {
              quotes.push({ author: '', work: '', quote: qm[1].trim() });
            }
          }
        }
      }

      // Fallbacks if no callout was present
      if (!primaryDef) {
        const lineMatch = rawContent.match(/\*\*Definition:\*\*\s*([^\n]+)/i) || rawContent.match(/#+\s*Definition\s*\n+([^\n#]+)/i);
        if (lineMatch) primaryDef = this.cleanDefinitionText(lineMatch[1]);
      }
    }

    if (!primaryDef) {
      primaryDef = 'A fundamental classical vocabulary entry with rich etymological history and derived English usage.';
    }

    const primaryQuote = quotes[0] || null;

    return {
      defText: primaryDef,
      secondaryDef: secondaryDef && secondaryDef !== primaryDef ? secondaryDef : '',
      quotes: quotes.slice(0, 3),
      quoteText: primaryQuote ? primaryQuote.quote : '',
      quoteAuthor: primaryQuote ? primaryQuote.author : '',
      quoteWork: primaryQuote ? primaryQuote.work : '',
      pos: pos || (card.category === 'latin' ? 'Latin derivative' : card.category === 'greek' ? 'Greek derivative' : 'vocab')
    };
  }

  /* ========================================================================
     TAB 3: DAILY WORD (RANDOM CARD SELECTION FROM PURE WORD POOL)
     ======================================================================== */

  async renderDailyCard(pickNew = false) {
    const contentEl = document.getElementById('daily-card-content');

    if (this.allWordCards.length === 0) {
      if (contentEl) {
        contentEl.innerHTML = `
          <div style="text-align:center; padding:30px 10px;">
            <div style="font-size:32px; margin-bottom:10px;">⏳</div>
            <p style="color:var(--web-text-secondary); font-size:14px;">Preparing random words from vault...</p>
          </div>
        `;
      }
      return;
    }

    if (pickNew || !this.dailyCurrentCard) {
      const randIdx = Math.floor(Math.random() * this.allWordCards.length);
      this.dailyCurrentCard = this.allWordCards[randIdx];
      this.dailyRevealed = false;
    }

    const card = this.dailyCurrentCard;
    if (!contentEl || !card) return;

    const status = this.getStatus(card.path);

    // Fetch content if not cached
    let rawContent = this.coreNotes[card.path] || '';
    if (!rawContent) {
      try {
        const res = await fetch(`/api/note?path=${encodeURIComponent(card.path)}`);
        if (res.ok) {
          const data = await res.json();
          rawContent = data.content || '';
          this.coreNotes[card.path] = rawContent;
        }
      } catch (e) {}
    }

    const { defText, secondaryDef, quotes, quoteText, quoteAuthor, quoteWork, pos } = this.extractCardDetails(card, rawContent);
    const quoteList = quotes && quotes.length > 0
      ? quotes
      : (quoteText ? [{ quote: quoteText, author: quoteAuthor, work: quoteWork }] : []);

    contentEl.innerHTML = `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:8px;">
          <span class="card-category-pill">${escapeHtml(card.category.toUpperCase())}</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <button class="tiktok-pronounce-btn" id="btn-daily-pronounce" title="Pronounce Word" style="padding:3px 9px; font-size:11px;">
              <span>🔊</span> <span>Listen</span>
            </button>
            <button class="tiktok-original-btn" id="btn-daily-original" title="View Full Original Markdown Note" style="padding:3px 9px; font-size:11px;">
              <span>📄</span> <span>Original</span>
            </button>
          </div>
        </div>

        <div class="daily-word-prominent">${escapeHtml(card.name)}</div>
        <div class="tiktok-morph-row" style="margin-bottom:12px;">
          <span class="tiktok-pos-pill">${escapeHtml(pos || 'vocabulary')}</span>
          <span class="tiktok-exhaustive-badge">
            <span>✅</span> <span>Exhaustive Permutation</span>
          </span>
        </div>

        <div class="daily-hint-blur ${this.dailyRevealed ? 'revealed' : ''}">
          <div class="tiktok-def-box" style="margin-top:10px;">
            <div class="tiktok-def-header-row">
              <div class="tiktok-def-title">📖 Core Definition</div>
              <div class="tiktok-def-status-mount" id="daily-card-apple-toggle-mount"></div>
            </div>
            <div class="tiktok-def-text">${escapeHtml(defText)}</div>
            ${secondaryDef ? `
              <div class="tiktok-def-secondary">
                <div class="tiktok-def-secondary-label">💡 Nuance / Specialized Register</div>
                <div class="tiktok-def-secondary-text">${escapeHtml(secondaryDef)}</div>
              </div>
            ` : ''}
          </div>

          ${quoteList.length > 0 ? `
            <div class="tiktok-quotes-stack" style="margin-top:10px;">
              <div class="tiktok-quotes-header">💬 Literary & Contextual Citations (${quoteList.length})</div>
              ${quoteList.map((q) => `
                <div class="tiktok-quote-box">
                  <div class="tiktok-quote-text">“${this.formatQuoteHtml(q.quote, card.name)}”</div>
                  ${(q.author || q.work) ? `
                    <div class="tiktok-quote-author">
                      <span>— ${escapeHtml(q.author)}${q.work ? ` <em>(${escapeHtml(q.work)})</em>` : ''}</span>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        ${!this.dailyRevealed ? `
          <div class="daily-reveal-btn-cue">
            <span>👆 Tap card to reveal definition & examples</span>
          </div>
        ` : ''}
      </div>

      <div style="margin-top:20px;">
        <div style="font-size:11.5px; font-weight:700; color:var(--web-text-muted); margin-bottom:8px; text-align:center;">
          Rate your mastery:
        </div>
        <div class="card-status-btn-group">
          <button class="card-status-btn ${status === 'unread' ? 'active unread' : ''}" data-daily-status="unread">
            <span>🔴 Need Review</span>
          </button>
          <button class="card-status-btn ${status === 'learning' ? 'active learning' : ''}" data-daily-status="learning">
            <span>🟡 Studying</span>
          </button>
          <button class="card-status-btn ${status === 'learned' ? 'active learned' : ''}" data-daily-status="learned">
            <span>🟢 Got It!</span>
          </button>
        </div>
      </div>
    `;

    // Mount Apple Glide status toggle at top of daily definition
    const dailyAppleMount = contentEl.querySelector('#daily-card-apple-toggle-mount');
    if (dailyAppleMount) {
      const dailyToggle = createAppleStatusToggle(status, async (nextStatus) => {
        this.setStatus(card.path, nextStatus);
        contentEl.querySelectorAll('[data-daily-status]').forEach(b => {
          const isMatch = b.dataset.dailyStatus === nextStatus;
          b.className = isMatch ? `card-status-btn active ${nextStatus}` : 'card-status-btn';
        });
      });
      dailyAppleMount.appendChild(dailyToggle);
    }

    // Pronounce audio
    contentEl.querySelector('#btn-daily-pronounce')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.speakWord(card.name);
    });

    // Original note button
    contentEl.querySelector('#btn-daily-original')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openOriginalNoteView(card.path);
    });

    // Status clicks with smooth auto-advance
    contentEl.querySelectorAll('[data-daily-status]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const st = btn.dataset.dailyStatus;
        this.setStatus(card.path, st);
        this.incrementDailyCount();
        this.showToast(st === 'learned' ? '🟢 Got It! Drawing next...' : st === 'learning' ? '🟡 Studying! Drawing next...' : '🔴 Marked for review');
        setTimeout(() => {
          this.renderDailyCard(true);
        }, 320);
      });
    });

    // Reveal toggle
    const wrapper = document.getElementById('daily-card-wrapper');
    wrapper.onclick = (e) => {
      if (e.target.closest('button, .card-status-btn-group')) return;
      this.dailyRevealed = !this.dailyRevealed;
      const blurEl = contentEl.querySelector('.daily-hint-blur');
      if (blurEl) blurEl.classList.toggle('revealed', this.dailyRevealed);
      const cue = contentEl.querySelector('.daily-reveal-btn-cue');
      if (cue) cue.style.display = this.dailyRevealed ? 'none' : 'flex';
    };
  }

  /* ========================================================================
     TAB 4: SETTINGS & TRACKING SYSTEM HUD
     ======================================================================== */

  updateTrackingHUD() {
    let learned = 0;
    let learning = 0;
    let unread = 0;

    const total = 51598; // Pure Vocabulary Vault Total

    const disciplineStats = {
      greek: { learned: 0, total: 17987 },
      latin: { learned: 0, total: 33028 },
      vocab: { learned: 0, total: 583 }
    };

    for (const p in this.statusDb) {
      const st = this.statusDb[p];
      if (st === 'learned') {
        learned++;
        if (p.startsWith('Greek roots/')) disciplineStats.greek.learned++;
        else if (p.startsWith('Latin roots/')) disciplineStats.latin.learned++;
        else if (p.startsWith('English vocabulary master/')) disciplineStats.vocab.learned++;
      } else if (st === 'learning') {
        learning++;
      } else if (st === 'unread') {
        unread++;
      }
    }

    const unreadCalculated = Math.max(0, total - learned - learning);

    const learnedPct = ((learned / total) * 100).toFixed(1);
    const learningPct = ((learning / total) * 100).toFixed(1);
    const unreadPct = Math.max(0, 100 - learnedPct - learningPct);

    // 1. Update Tab 4 (Settings) HUD numbers
    const elLearned = document.getElementById('hud-count-learned');
    const elLearning = document.getElementById('hud-count-learning');
    const elUnread = document.getElementById('hud-count-unread');

    if (elLearned) elLearned.textContent = learned.toLocaleString();
    if (elLearning) elLearning.textContent = learning.toLocaleString();
    if (elUnread) elUnread.textContent = unreadCalculated.toLocaleString();

    // 2. Update Tab 4 (Settings) Segmented Bar
    const segLearned = document.getElementById('hud-seg-learned');
    const segLearning = document.getElementById('hud-seg-learning');
    const segUnread = document.getElementById('hud-seg-unread');

    if (segLearned) segLearned.style.width = `${Math.max(1, learnedPct)}%`;
    if (segLearning) segLearning.style.width = `${Math.max(1, learningPct)}%`;
    if (segUnread) segUnread.style.width = `${unreadPct}%`;

    // 3. Update Tab 1 (Home) Hero Quick Stats
    const homeLearned = document.getElementById('home-stat-learned');
    const homeStudying = document.getElementById('home-stat-studying');
    if (homeLearned) homeLearned.textContent = learned.toLocaleString();
    if (homeStudying) homeStudying.textContent = learning.toLocaleString();

    // 4. Update Tab 1 (Home) Category Card Progress Bars & Counts
    for (const [disc, data] of Object.entries(disciplineStats)) {
      const fillEl = document.getElementById(`prog-fill-${disc}`);
      const textEl = document.getElementById(`prog-text-${disc}`);
      const pct = Math.min(100, (data.learned / data.total) * 100);
      if (fillEl) fillEl.style.width = `${Math.max(data.learned > 0 ? 3 : 0, pct.toFixed(1))}%`;
      if (textEl && data.learned > 0) {
        textEl.textContent = `${data.learned} / ${data.total} (${pct.toFixed(0)}%)`;
      }
    }

    // 5. Update Tab 2 (Cards) Status Filter Chip Badges
    const chipUnread = document.querySelector('#cards-status-chips [data-status="unread"]');
    const chipLearning = document.querySelector('#cards-status-chips [data-status="learning"]');
    const chipLearned = document.querySelector('#cards-status-chips [data-status="learned"]');
    if (chipUnread) chipUnread.textContent = `🔴 Unread (${unreadCalculated > 1000 ? Math.round(unreadCalculated/1000) + 'k' : unreadCalculated})`;
    if (chipLearning) chipLearning.textContent = `🟡 Studying (${learning})`;
    if (chipLearned) chipLearned.textContent = `🟢 Learned (${learned})`;
  }

  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('vocab_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;

    // Meta theme-color for iOS/Android status bar
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'light' ? '#F4F1EA' : '#100F0E';
    }

    // Update buttons in settings
    document.querySelectorAll('.theme-pick-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === theme);
    });
  }

  applyTypography() {
    localStorage.setItem('vocab_typography', JSON.stringify(this.typography));
    const root = document.documentElement;

    const fontMap = {
      sans: "'Plus Jakarta Sans', 'Manrope', -apple-system, sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      mono: "'JetBrains Mono', 'Fira Sans', monospace"
    };

    root.style.setProperty('--web-font-sans', fontMap[this.typography.font] || fontMap.sans);
    root.style.setProperty('--web-font-body', fontMap[this.typography.font] || fontMap.sans);
    document.body.style.fontSize = `${this.typography.size}px`;
    document.body.style.lineHeight = String(this.typography.lineHeight);

    // Update settings labels & inputs
    const sizeLbl = document.getElementById('label-font-size');
    const heightLbl = document.getElementById('label-line-height');
    const sizeSlider = document.getElementById('slider-font-size');
    const heightSlider = document.getElementById('slider-line-height');

    if (sizeLbl) sizeLbl.textContent = `${this.typography.size}px`;
    if (heightLbl) heightLbl.textContent = String(this.typography.lineHeight);
    if (sizeSlider) sizeSlider.value = this.typography.size;
    if (heightSlider) heightSlider.value = this.typography.lineHeight;

    document.querySelectorAll('.typo-font-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.font === this.typography.font);
    });
  }

  /* ========================================================================
     GESTURE RECOGNITION (HORIZONTAL SWIPE FOR HOME, VERTICAL FOR FEED)
     ======================================================================== */

  bindTouchGestures() {
    let ignoreSwipe = false;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        if (e.target.closest('input, button, .filter-chips-scroll, .table-scroll-wrapper, pre, code')) {
          ignoreSwipe = true;
          return;
        }
        ignoreSwipe = false;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.touchStartTime = Date.now();
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (ignoreSwipe) return;
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - this.touchStartX;
        const deltaY = e.changedTouches[0].clientY - this.touchStartY;
        const elapsed = Date.now() - this.touchStartTime;

        // 1. Horizontal swipe on Home Tab -> toggle between pages in navigation stack
        if (this.activeTab === 'home') {
          if (Math.abs(deltaX) > 55 && Math.abs(deltaY) < 65 && elapsed < 500) {
            if (deltaX > 0) {
              // Swipe Left-to-Right -> Go back
              this.goBackHome(true);
            } else if (deltaX < 0) {
              // Swipe Right-to-Left -> Advance to next page / section
              this.advanceHomeNext();
            }
          }
        }
        // 2. Vertical swipe on Word Cards Feed -> TikTok-style swipe up/down
        else if (this.activeTab === 'cards' && this.cardsViewMode === 'feed') {
          if (Math.abs(deltaY) > 40 && Math.abs(deltaY) > Math.abs(deltaX) && elapsed < 600) {
            if (deltaY < 0) {
              // Swipe Bottom-to-Up -> Next Word!
              this.nextFeedWord();
            } else {
              // Swipe Top-to-Bottom -> Previous Word!
              this.prevFeedWord();
            }
          }
        }
        // 3. Horizontal swipe on Daily Word -> draw next random
        else if (this.activeTab === 'daily') {
          if (deltaX < -55 && Math.abs(deltaY) < 65 && elapsed < 500) {
            this.renderDailyCard(true);
          }
        }
      }
    }, { passive: true });

    // Mouse wheel / trackpad scroll on TikTok Feed
    const feedContainer = document.getElementById('cards-feed-view');
    let lastWheelTime = 0;
    feedContainer?.addEventListener('wheel', (e) => {
      if (this.activeTab !== 'cards' || this.cardsViewMode !== 'feed') return;
      if (Math.abs(e.deltaY) < 25) return;
      const now = Date.now();
      if (now - lastWheelTime < 320) return;
      lastWheelTime = now;
      if (e.deltaY > 0) this.nextFeedWord();
      else this.prevFeedWord();
    }, { passive: true });
  }

  /* ========================================================================
     DOM EVENT BINDINGS
     ======================================================================== */

  bindDOMEvents() {
    // 1. Bottom Tab Bar Clicks
    document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // 2. Top Navigation Bar Back Button
    document.getElementById('top-back-btn')?.addEventListener('click', () => {
      if (this.activeTab === 'home') {
        this.goBackHome();
      }
    });

    // 3. Top Status Badge Click
    document.getElementById('top-status-badge')?.addEventListener('click', () => {
      if (this.activeTab === 'home' && this.homeStack.length > 0) {
        const current = this.homeStack[this.homeStack.length - 1];
        if (current.path) {
          this.cycleStatus(current.path);
        }
      }
    });

    // 4. Word Cards Controls
    let searchDebounceTimer = null;
    document.getElementById('cards-search-input')?.addEventListener('input', (e) => {
      this.cardsSearchQuery = e.target.value;
      const clearBtn = document.getElementById('cards-search-clear');
      if (clearBtn) clearBtn.style.display = this.cardsSearchQuery ? 'inline-flex' : 'none';
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        this.applyCardsFilter();
        if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
        else this.renderCardList();
      }, 120);
    });

    document.getElementById('cards-search-clear')?.addEventListener('click', () => {
      clearTimeout(searchDebounceTimer);
      const input = document.getElementById('cards-search-input');
      if (input) input.value = '';
      this.cardsSearchQuery = '';
      document.getElementById('cards-search-clear').style.display = 'none';
      this.applyCardsFilter();
      if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
      else this.renderCardList();
    });

    // Category chips
    document.querySelectorAll('#cards-category-chips .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.cardsFilterCategory = chip.dataset.cat;

        // If clicking a category chip, clear conflicting scope so selected category words show
        if (this.activeScope) {
          const scopeCat = this.activeScope.words && this.activeScope.words[0] ? this.activeScope.words[0].category : null;
          if (chip.dataset.cat === 'all' || (scopeCat && scopeCat !== chip.dataset.cat)) {
            this.activeScope = null;
          }
        }
        this.feedWordIndex = 0;
        this.applyCardsFilter();
        if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
        else this.renderCardList();
      });
    });

    // Status chips
    document.querySelectorAll('#cards-status-chips .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#cards-status-chips .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.cardsFilterStatus = chip.dataset.status;
        this.applyCardsFilter();
        if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
        else this.renderCardList();
      });
    });

    // Feed vs List mode buttons
    document.getElementById('btn-mode-feed')?.addEventListener('click', () => {
      this.cardsViewMode = 'feed';
      this.updateCardsViewMode();
    });
    document.getElementById('btn-mode-list')?.addEventListener('click', () => {
      this.cardsViewMode = 'list';
      this.updateCardsViewMode();
    });

    // Clear Scope Button (Restores full vocabulary deck from active root scope)
    document.getElementById('btn-clear-scope')?.addEventListener('click', () => {
      this.activeScope = null;
      this.cardsFilterCategory = 'all';
      this.cardsSearchQuery = '';
      const searchInput = document.getElementById('cards-search-input');
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('#cards-category-chips .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
      this.feedWordIndex = 0;
      this.applyCardsFilter();
      if (this.cardsViewMode === 'feed') this.renderFeedCard('none');
      else this.renderCardList();
      this.showToast('Showing all vocabulary words');
    });

    // TikTok Feed Tactile Controls
    document.getElementById('btn-feed-next')?.addEventListener('click', () => this.nextFeedWord());
    document.getElementById('btn-feed-prev')?.addEventListener('click', () => this.prevFeedWord());

    // Daily Word Shuffle
    document.getElementById('btn-daily-shuffle')?.addEventListener('click', () => {
      this.renderDailyCard(true);
    });

    // Settings Themes
    document.querySelectorAll('.theme-pick-card').forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.dataset.theme;
        this.applyTheme(theme);
      });
    });

    // Settings Typography
    document.querySelectorAll('.typo-font-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.typography.font = btn.dataset.font;
        this.applyTypography();
      });
    });

    document.getElementById('slider-font-size')?.addEventListener('input', (e) => {
      this.typography.size = Number(e.target.value);
      this.applyTypography();
    });

    document.getElementById('slider-line-height')?.addEventListener('input', (e) => {
      this.typography.lineHeight = Number(e.target.value);
      this.applyTypography();
    });

    // Cloud Git Sync
    document.getElementById('btn-sync-now')?.addEventListener('click', async () => {
      this.showToast('Initiating Git sync...');
      try {
        const res = await fetch('/api/sync', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          this.showToast(data.message || 'Sync completed successfully');
          await this.loadVaultData();
          this.updateTrackingHUD();
        } else {
          this.showToast('Sync request failed');
        }
      } catch (e) {
        this.showToast('Cloud sync offline');
      }
    });

    // Export Progress
    document.getElementById('btn-export-progress')?.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.statusDb, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', `vocab-progress-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
      this.showToast('Study progress exported');
    });

    // Import Progress
    const fileInput = document.getElementById('file-import-progress');
    document.getElementById('btn-import-progress')?.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (typeof imported === 'object' && imported !== null) {
            this.statusDb = { ...this.statusDb, ...imported };
            this.saveStatusDb();
            this.prepareWordCards();
            this.updateTrackingHUD();
            this.showToast('Progress imported successfully');
          }
        } catch {
          this.showToast('Invalid JSON file format');
        }
      };
      reader.readAsText(file);
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (this.activeTab === 'cards' && this.cardsViewMode === 'feed') {
        if (e.key === 'ArrowDown' || e.key === ' ') {
          e.preventDefault();
          this.nextFeedWord();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.prevFeedWord();
        }
      } else if (this.activeTab === 'daily') {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          this.renderDailyCard(true);
        }
      }
    });

    document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
      if (confirm('Reset your local vocabulary study progress?')) {
        this.statusDb = {};
        this.saveStatusDb();
        this.updateTrackingHUD();
        this.showToast('Progress reset');
      }
    });
  }

  showToast(msg) {
    const toast = document.getElementById('mobile-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;');
}

// Bootstrap application safely
function bootstrapMobileApp() {
  if (window.mobileVocabApp) return;
  const app = new MobileVocabApp();
  window.mobileVocabApp = app;
  app.init().catch(err => {
    console.error('Fatal initialization error in MobileVocabApp:', err);
  });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootstrapMobileApp);
} else {
  bootstrapMobileApp();
}
