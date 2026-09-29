import { execFile, exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';

const execAsync = promisify(exec);

/**
 * Robust Bi-directional Git Synchronization Engine for Obsidian Studio
 * Handles debounced auto-commits, cloud pushes, background auto-pulls,
 * and conflict-resilient fast-forward / rebase merging.
 */
export class GitSyncEngine {
  constructor() {
    this.vaultRoot = '';
    this.enabled = false;
    this.isRepo = false;
    this.remoteUrl = '';
    this.branch = 'main';
    this.githubToken = process.env.GITHUB_TOKEN || '';
    this.authorName = process.env.GIT_AUTHOR_NAME || 'Obsidian Studio Web';
    this.authorEmail = process.env.GIT_AUTHOR_EMAIL || 'sync@obsidian-studio.local';
    this.autoPullIntervalMs = Number(process.env.GIT_PULL_INTERVAL_SEC || 180) * 1000; // default 3 min
    this.debounceMs = Number(process.env.GIT_DEBOUNCE_SEC || 10) * 1000; // default 10s

    this.isSyncing = false;
    this.lastSyncedAt = null;
    this.lastSyncStatus = 'disabled'; // 'synced' | 'syncing' | 'offline' | 'error' | 'disabled'
    this.lastError = null;
    this.pendingChanges = new Map(); // path -> action ('edit' | 'create' | 'delete' | 'rename')
    this.debounceTimer = null;
    this.autoPullTimer = null;
    this.onNewCommitsCallback = null;
  }

  async runGit(args, cwd = this.vaultRoot) {
    try {
      const cmd = `git ${args}`;
      const { stdout, stderr } = await execAsync(cmd, {
        cwd,
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: '0',
          GIT_COMMITTER_NAME: this.authorName,
          GIT_COMMITTER_EMAIL: this.authorEmail,
          GIT_AUTHOR_NAME: this.authorName,
          GIT_AUTHOR_EMAIL: this.authorEmail
        },
        maxBuffer: 10 * 1024 * 1024
      });
      return { ok: true, stdout: stdout.trim(), stderr: stderr.trim() };
    } catch (err) {
      return { ok: false, error: err.message, stderr: (err.stderr || '').trim() };
    }
  }

  async init(vaultRoot, { onNewCommits = null } = {}) {
    this.vaultRoot = path.resolve(vaultRoot);
    this.onNewCommitsCallback = onNewCommits;

    // Check if git executable exists
    const gitCheck = await this.runGit('--version', process.cwd());
    if (!gitCheck.ok) {
      console.log('ℹ️  Git CLI not found on system PATH. Git Auto-Sync is disabled.');
      this.lastSyncStatus = 'disabled';
      return;
    }

    const dotGit = path.join(this.vaultRoot, '.git');
    this.isRepo = fs.existsSync(dotGit);

    if (!this.isRepo) {
      console.log(`ℹ️  Vault at "${this.vaultRoot}" is not a Git repository. Git Auto-Sync is disabled.`);
      this.lastSyncStatus = 'disabled';
      return;
    }

    this.enabled = true;
    this.lastSyncStatus = 'synced';

    // Detect current branch
    const branchRes = await this.runGit('rev-parse --abbrev-ref HEAD');
    if (branchRes.ok && branchRes.stdout) {
      this.branch = branchRes.stdout;
    }

    // Detect remote URL
    const remoteRes = await this.runGit('remote get-url origin');
    if (remoteRes.ok && remoteRes.stdout) {
      this.remoteUrl = remoteRes.stdout;
      // Configure credentials if GITHUB_TOKEN is supplied and remote is HTTPS
      if (this.githubToken && this.remoteUrl.startsWith('https://')) {
        try {
          const u = new URL(this.remoteUrl);
          u.username = 'x-access-token';
          u.password = this.githubToken;
          await this.runGit(`remote set-url origin "${u.toString()}"`);
          console.log('🔒 Configured Git remote credentials via GITHUB_TOKEN.');
        } catch {
          // ignore url parse error
        }
      }
    }

    // Configure local repository author
    await this.runGit(`config user.name "${this.authorName}"`);
    await this.runGit(`config user.email "${this.authorEmail}"`);

    console.log(`\n🐙 Git Auto-Sync Engine Active:`);
    console.log(`   ➜ Vault Repo: ${this.vaultRoot}`);
    console.log(`   ➜ Branch:     ${this.branch}`);
    console.log(`   ➜ Remote:     ${this.remoteUrl ? this.remoteUrl.replace(/\/\/.*@/, '//***@') : '(none)'}`);
    console.log(`   ➜ Auto-Pull:  every ${this.autoPullIntervalMs / 1000}s\n`);

    // Start background auto-pull interval
    if (this.remoteUrl) {
      this.startAutoPull();
    }
  }

  startAutoPull() {
    if (this.autoPullTimer) clearInterval(this.autoPullTimer);
    this.autoPullTimer = setInterval(async () => {
      if (this.isSyncing) return;
      await this.pull();
    }, this.autoPullIntervalMs);
  }

  queueChange(relPath, action = 'edit') {
    if (!this.enabled) return;
    this.pendingChanges.set(relPath, action);

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      await this.commitAndPush();
    }, this.debounceMs);
  }

  async commitAndPush(customMessage = null) {
    if (!this.enabled || this.isSyncing) return;
    this.isSyncing = true;
    this.lastSyncStatus = 'syncing';

    try {
      // 1. Stage all changes
      await this.runGit('add -A');

      // 2. Check if there are changes to commit
      const statusRes = await this.runGit('status --porcelain');
      if (!statusRes.ok) throw new Error(statusRes.error);

      if (statusRes.stdout.length > 0) {
        let msg = customMessage;
        if (!msg) {
          const count = this.pendingChanges.size || 1;
          const samplePaths = Array.from(this.pendingChanges.keys()).slice(0, 3).map(p => path.basename(p));
          const sampleList = samplePaths.join(', ');
          const more = count > 3 ? ` +${count - 3} more` : '';
          msg = `sync: update ${sampleList}${more} [Obsidian Web App]`;
        }

        const commitRes = await this.runGit(`commit -m "${msg.replace(/"/g, '\\"')}"`);
        if (!commitRes.ok) {
          console.warn('Git commit warning:', commitRes.stderr || commitRes.error);
        } else {
          console.log(`💾 Committed ${this.pendingChanges.size} changes: "${msg}"`);
        }
      }

      this.pendingChanges.clear();

      // 3. Push to remote if remote exists
      if (this.remoteUrl) {
        console.log(`🚀 Pushing changes to origin/${this.branch}...`);
        const pushRes = await this.runGit(`push origin ${this.branch}`);
        if (!pushRes.ok) {
          // If rejected due to upstream changes, pull with rebase then retry push
          if (pushRes.stderr && pushRes.stderr.includes('fetch first')) {
            console.log('🔄 Upstream changes detected, rebasing...');
            await this.pull();
            const retryPush = await this.runGit(`push origin ${this.branch}`);
            if (!retryPush.ok) throw new Error(retryPush.stderr || retryPush.error);
          } else {
            throw new Error(pushRes.stderr || pushRes.error);
          }
        }
        console.log(`✅ Git push succeeded to origin/${this.branch}`);
      }

      this.lastSyncedAt = new Date().toISOString();
      this.lastSyncStatus = 'synced';
      this.lastError = null;
    } catch (err) {
      console.error('❌ Git push error:', err.message);
      this.lastSyncStatus = 'error';
      this.lastError = err.message;
    } finally {
      this.isSyncing = false;
    }
  }

  async pull() {
    if (!this.enabled || !this.remoteUrl || this.isSyncing) return { ok: false, pulled: false };
    this.isSyncing = true;
    this.lastSyncStatus = 'syncing';

    try {
      // Get current HEAD sha
      const beforeSha = (await this.runGit('rev-parse HEAD')).stdout;

      // Fetch origin
      const fetchRes = await this.runGit(`fetch origin ${this.branch}`);
      if (!fetchRes.ok) throw new Error(fetchRes.stderr || fetchRes.error);

      // Check if upstream has new commits
      const countRes = await this.runGit(`rev-list HEAD..origin/${this.branch} --count`);
      const newCommitsCount = Number(countRes.stdout || 0);

      if (newCommitsCount > 0) {
        console.log(`📥 Found ${newCommitsCount} new remote commits. Rebasing local vault...`);
        // Pull with rebase or autostash
        const pullRes = await this.runGit(`pull --rebase --autostash origin ${this.branch}`);
        if (!pullRes.ok) throw new Error(pullRes.stderr || pullRes.error);

        const afterSha = (await this.runGit('rev-parse HEAD')).stdout;
        console.log(`✅ Rebased successfully: ${beforeSha.slice(0, 7)} ➔ ${afterSha.slice(0, 7)}`);

        // Trigger index rebuild so new notes / status updates reflect immediately
        if (typeof this.onNewCommitsCallback === 'function') {
          console.log('🔄 Triggering vault index rebuild from new Git commits...');
          this.onNewCommitsCallback();
        }

        this.lastSyncedAt = new Date().toISOString();
        this.lastSyncStatus = 'synced';
        this.lastError = null;
        return { ok: true, pulled: true, count: newCommitsCount };
      } else {
        this.lastSyncedAt = new Date().toISOString();
        this.lastSyncStatus = 'synced';
        this.lastError = null;
        return { ok: true, pulled: false, count: 0 };
      }
    } catch (err) {
      console.warn('⚠️ Git pull error:', err.message);
      this.lastSyncStatus = 'error';
      this.lastError = err.message;
      return { ok: false, error: err.message };
    } finally {
      this.isSyncing = false;
    }
  }

  async manualSync() {
    if (!this.enabled) return { ok: false, error: 'Git sync is not enabled for this vault' };
    const pullResult = await this.pull();
    await this.commitAndPush('sync: manual sync triggered from web app');
    return {
      ok: this.lastSyncStatus !== 'error',
      status: this.getStatus(),
      pull: pullResult
    };
  }

  getStatus() {
    return {
      enabled: this.enabled,
      isRepo: this.isRepo,
      branch: this.branch,
      remoteUrl: this.remoteUrl ? this.remoteUrl.replace(/\/\/.*@/, '//***@') : null,
      lastSyncedAt: this.lastSyncedAt,
      status: this.lastSyncStatus,
      isSyncing: this.isSyncing,
      pendingChangesCount: this.pendingChanges.size,
      lastError: this.lastError
    };
  }
}

export const gitSync = new GitSyncEngine();
